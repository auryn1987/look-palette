import { Resend } from 'resend';
import type { RequestEvent } from '@sveltejs/kit';
import validator from 'validator';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3; // Maximum requests per window

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

	let { firstName, lastName, email, message } = await request.json();

	// Validate required fields
	if (!firstName || !lastName || !email || !message) {
		return new Response(JSON.stringify({ error: 'All fields are required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Sanitize and validate inputs
	firstName = firstName.trim();
	lastName = lastName.trim();
	email = email.trim().toLowerCase();
	message = message.trim();

	// Validate email format
	if (!validator.isEmail(email)) {
		return new Response(JSON.stringify({ error: 'Invalid email format' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Validate name lengths
	if (firstName.length < 1 || firstName.length > 50) {
		return new Response(
			JSON.stringify({ error: 'First name must be between 1 and 50 characters' }),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	if (lastName.length < 1 || lastName.length > 50) {
		return new Response(
			JSON.stringify({ error: 'Last name must be between 1 and 50 characters' }),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	// Validate message length (max 1000 characters)
	if (message.length < 10) {
		return new Response(JSON.stringify({ error: 'Message must be at least 10 characters long' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (message.length > 1000) {
		return new Response(JSON.stringify({ error: 'Message must be no more than 1000 characters' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const { data, error } = await resend.emails.send({
			from: 'Look Palette <noreply@lookpalette.com>',
			to: ['contact@lookpalette.com'],
			subject: `New Contact Form Submission from ${firstName} ${lastName}`,
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Message:</strong></p>
		<p>${message.replace(/\n/g, '<br>')}</p>
		<hr>
		<p><small>Sent from Look Palette contact form</small></p>
      `,
			text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}

---
Sent from Look Palette contact form
      `
		});

		if (error) {
			console.error('Resend error:', error);
			return new Response(
				JSON.stringify({
					error: 'Failed to send message. Please try again later.',
					details: error.message
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		console.log('Contact form submission:', { firstName, lastName, email, message });

		return new Response(JSON.stringify({ message: 'Message sent successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Contact form error:', error);
		return new Response(
			JSON.stringify({
				error: 'An error occurred while sending your message. Please try again later.'
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
}
