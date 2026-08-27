import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	let user = await locals.getUser();

	// If no user from Supabase session, try to get from our session cookie
	if (!user) {
		const sessionCookie = cookies.get('user-session');
		if (sessionCookie) {
			try {
				const parsedUser = JSON.parse(sessionCookie);
				user = parsedUser;
			} catch (error) {
				console.error('Error parsing session cookie:', error);
			}
		}
	}

	return {
		user: user
			? {
					id: user.id,
					email: user.email,
					created_at: user.created_at
				}
			: null
	};
};
