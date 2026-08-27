// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { SupabaseClient, User, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
			getUser(): Promise<User | null>;
			isAuthenticated(): Promise<boolean>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*.md' {
	import type { ComponentType } from 'svelte';
	const component: ComponentType;
	const metadata: {
		title: string;
		description: string;
		date: string;
		author: string;
		tags?: string[];
		image?: string;
	};
	export { component as default, metadata };
}

export {};
