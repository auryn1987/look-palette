<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { User } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let { children, data } = $props<{ data: { user: User | null } }>();
	let user = $state(data.user);

	onMount(() => {
		// Get initial session
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session?.user) {
				user = session.user;
				console.log('Initial session found:', session.user.email);
			}
		});

		// Listen for auth state changes on the client
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log('Auth state changed:', event, session?.user?.email);
			user = session?.user ?? null;
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="min-h-screen bg-white">
	<Navbar {user} />
	{@render children()}
	<Footer />
</div>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #000000;
	}

	:global(body) {
		background-color: #000000;
	}

	:global(.min-h-screen) {
		background-color: #ffffff;
	}

	:global(::-webkit-scrollbar) {
		width: 12px;
		background-color: #ffffff;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: #2b1811;
		border-radius: 6px;
		border: 3px solid #ffffff;
	}

	:global(::-webkit-scrollbar-track) {
		background-color: #ffffff;
	}
</style>
