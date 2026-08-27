import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendMagicLink } from '$lib/auth';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, mode } = await request.json();

		// Validate input
		if (!email || typeof email !== 'string') {
			return json({ error: 'Valid email is required' }, { status: 400 });
		}

		if (!mode || !['signin', 'signup'].includes(mode)) {
			return json({ error: 'Valid mode is required' }, { status: 400 });
		}

		// Send magic link using Supabase
		const result = await sendMagicLink(email, mode);

		if (!result.success) {
			return json({ error: result.error || 'Failed to send magic link' }, { status: 500 });
		}

		return json({
			success: true,
			message: 'Magic link sent successfully'
		});
	} catch (error) {
		console.error('Magic link error:', error);
		return json(
			{
				error: 'Failed to send magic link. Please try again.'
			},
			{ status: 500 }
		);
	}
};
