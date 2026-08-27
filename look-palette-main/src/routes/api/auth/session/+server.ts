import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCurrentUser } from '$lib/auth';

export const GET: RequestHandler = async () => {
	try {
		// Get current user from Supabase
		const user = await getCurrentUser();

		if (!user) {
			return json({ user: null });
		}

		return json({
			user: {
				id: user.id,
				email: user.email,
				created_at: user.created_at
			}
		});
	} catch (error) {
		console.error('Session error:', error);
		return json({ user: null });
	}
};
