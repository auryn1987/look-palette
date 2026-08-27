import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { RequestEvent } from '@sveltejs/kit';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
	console.error('Missing Supabase environment variables:', {
		hasUrl: !!PUBLIC_SUPABASE_URL,
		hasKey: !!PUBLIC_SUPABASE_ANON_KEY,
		url: PUBLIC_SUPABASE_URL?.substring(0, 20) + '...',
		key: PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
	});
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
	}
});

// Server-side Supabase client
export const createSupabaseServerClient = (event?: RequestEvent) => {
	const cookieHeader = event?.request.headers.get('cookie') || '';

	return createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			headers: {
				cookie: cookieHeader
			}
		},
		auth: {
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false
		}
	});
};

// Types
export interface User {
	id: string;
	email: string;
	created_at: string;
	updated_at: string;
}

export interface Session {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	token_type: string;
	user: User;
}
