import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';
import { PUBLIC_FRONTEND_URL, PUBLIC_FRONTEND_URL_TESTING } from '$env/static/public';

// Magic link authentication using Supabase
export async function sendMagicLink(
	email: string,
	mode: 'signin' | 'signup'
): Promise<{ success: boolean; error?: string }> {
	try {
		// Get the base URL from environment or use a fallback
		const baseUrl =
			typeof window !== 'undefined'
				? window.location.origin
				: PUBLIC_FRONTEND_URL || PUBLIC_FRONTEND_URL_TESTING || 'http://localhost:5173';

		// Log in development only
		if (process.env.NODE_ENV === 'development') {
			console.log(
				'Sending magic link to:',
				email,
				'with redirect URL:',
				`${baseUrl}/auth/callback`,
				'mode:',
				mode
			);
		}

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${baseUrl}/auth/callback?next=/dashboard`,
				shouldCreateUser: mode === 'signup' // This should create user for signup
			}
		});

		if (error) {
			console.error('Magic link error:', error);

			// Handle rate limiting
			if (error.code === 'over_email_send_rate_limit') {
				return {
					success: false,
					error: 'Too many requests. Please wait a few minutes before trying again.'
				};
			}

			// Handle specific error for disabled signups
			if (error.message.includes('Signups not allowed') || error.code === 'otp_disabled') {
				return {
					success: false,
					error:
						'Email signups are disabled. Please contact support or use a different email address.'
				};
			}

			return { success: false, error: error.message };
		}

		// Log in development only
		if (process.env.NODE_ENV === 'development') {
			console.log('Magic link sent successfully');
		}
		return { success: true };
	} catch (error) {
		console.error('Magic link error:', error);
		return { success: false, error: 'Failed to send magic link' };
	}
}

// Verify magic link and get user
export async function verifyMagicLink(
	token: string
): Promise<{ user: User | null; error?: string }> {
	try {
		const { data, error } = await supabase.auth.verifyOtp({
			token_hash: token,
			type: 'email'
		});

		if (error) {
			console.error('Token verification error:', error);
			return { user: null, error: error.message };
		}

		// Log in development only
		if (process.env.NODE_ENV === 'development') {
			console.log('User verified successfully:', data.user?.id);
		}
		return { user: data.user };
	} catch (error) {
		console.error('Token verification error:', error);
		return { user: null, error: 'Failed to verify token' };
	}
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
	try {
		const {
			data: { user },
			error
		} = await supabase.auth.getUser();

		if (error || !user) {
			return null;
		}

		return user;
	} catch (error) {
		console.error('Get user error:', error);
		return null;
	}
}

// Get current session
export async function getCurrentSession() {
	try {
		const {
			data: { session },
			error
		} = await supabase.auth.getSession();

		if (error) {
			console.error('Get session error:', error);
			return null;
		}

		return session;
	} catch (error) {
		console.error('Get session error:', error);
		return null;
	}
}

// Sign out
export async function signOut(): Promise<{ success: boolean; error?: string }> {
	try {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error('Sign out error:', error);
			return { success: false, error: error.message };
		}

		return { success: true };
	} catch (error) {
		console.error('Sign out error:', error);
		return { success: false, error: 'Failed to sign out' };
	}
}

// Google OAuth
export async function signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
	try {
		// Get the base URL from environment or use a fallback
		const baseUrl =
			typeof window !== 'undefined'
				? window.location.origin
				: PUBLIC_FRONTEND_URL || PUBLIC_FRONTEND_URL_TESTING || 'http://localhost:5173';

		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${baseUrl}/auth/callback`
			}
		});

		if (error) {
			console.error('Google sign in error:', error);
			return { success: false, error: error.message };
		}

		return { success: true };
	} catch (error) {
		console.error('Google sign in error:', error);
		return { success: false, error: 'Failed to sign in with Google' };
	}
}
