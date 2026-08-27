import { supabase } from '$lib/supabase';
import type { RequestEvent } from '@sveltejs/kit';
import validator from 'validator';

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // Maximum requests per window

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const record = rateLimitStore.get(ip);

	if (!record) {
		rateLimitStore.set(ip, { count: 1, resetTime: now + WINDOW_MS });
		return true;
	}

	if (now > record.resetTime) {
		rateLimitStore.set(ip, { count: 1, resetTime: now + WINDOW_MS });
		return true;
	}

	if (record.count >= MAX_REQUESTS) {
		return false;
	}

	record.count += 1;
	rateLimitStore.set(ip, record);
	return true;
}

export async function POST({ request, getClientAddress }: RequestEvent) {
	const clientIp = getClientAddress();

	if (!checkRateLimit(clientIp)) {
		return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
			status: 429,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	let { email } = await request.json();

	// Sanitize and validate email
	email = email.trim().toLowerCase();
	if (!validator.isEmail(email)) {
		return new Response(JSON.stringify({ error: 'Invalid email format' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Check for existing subscription
	const { data: existing } = await supabase
		.from('subscribers')
		.select()
		.eq('email', email)
		.single();

	if (existing) {
		return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Insert new subscription
	const { error } = await supabase
		.from('subscribers')
		.insert([
			{
				email: email,
				status: 'active',
				created_at: new Date().toISOString()
			}
		])
		.select()
		.single();

	if (error) {
		console.error('Supabase error:', error);
		return new Response(
			JSON.stringify({
				error: 'Database error while subscribing',
				details: error.message
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	return new Response(JSON.stringify({ message: 'Subscribed successfully' }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
