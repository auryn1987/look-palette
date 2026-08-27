import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { user } = await request.json();

		if (!user || !user.id || !user.email) {
			return json({ error: 'Invalid user data' }, { status: 400 });
		}

		// Set a session cookie with the user data
		cookies.set('user-session', JSON.stringify(user), {
			path: '/',
			httpOnly: true,
			secure: false, // Set to true in production
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		return json({ success: true });
	} catch (error) {
		console.error('Sync session error:', error);
		return json({ error: 'Failed to sync session' }, { status: 500 });
	}
};
