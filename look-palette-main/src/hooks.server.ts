import { createSupabaseServerClient } from '$lib/supabase';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Create a Supabase client for the server
	event.locals.supabase = createSupabaseServerClient(event);

	// Get the session from the cookie
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	// Get the user from the session
	event.locals.getUser = async () => {
		const session = await event.locals.getSession();
		return session?.user ?? null;
	};

	// Check if user is authenticated
	event.locals.isAuthenticated = async () => {
		const user = await event.locals.getUser();
		return !!user;
	};

	// Handle protected routes - temporarily disabled for client-side auth
	// const protectedRoutes = ['/dashboard', '/palettes'];
	// const isProtectedRoute = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

	// if (isProtectedRoute) {
	// 	const user = await event.locals.getUser();
	// 	console.log('Protected route check:', {
	// 		path: event.url.pathname,
	// 		hasUser: !!user,
	// 		userEmail: user?.email
	// 	});

	// 	if (!user) {
	// 		// Redirect to signin page if not authenticated
	// 		console.log('No user found, redirecting to signin');
	// 		throw redirect(303, '/signin');
	// 	}
	// }

	// Handle auth routes (signin, signup) - redirect if already authenticated
	const authRoutes = ['/signin', '/signup'];
	const isAuthRoute = authRoutes.some((route) => event.url.pathname.startsWith(route));

	if (isAuthRoute) {
		const user = await event.locals.getUser();
		if (user) {
			// Redirect to dashboard if already authenticated
			throw redirect(303, '/dashboard');
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
