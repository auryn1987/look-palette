<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';

	let status = 'Processing authentication...';
	let error = '';

	onMount(async () => {
		try {
			// Check for error parameters first
			const urlParams = new URLSearchParams(window.location.search);
			const errorParam = urlParams.get('error');
			const errorDescription = urlParams.get('error_description');

			if (errorParam) {
				throw new Error(errorDescription || 'Authentication failed');
			}

			// For magic links, Supabase should automatically handle the session
			// Let's check if we have a session after the redirect
			const {
				data: { session },
				error: sessionError
			} = await supabase.auth.getSession();

			if (sessionError) {
				throw sessionError;
			}

			if (session?.user) {
				status = 'Redirecting to dashboard...';

				// Explicitly set the session to ensure cookies are persisted
				const { error: setSessionError } = await supabase.auth.setSession(session);
				if (setSessionError) {
					console.error('Error setting session:', setSessionError);
				}

				// Add a small delay to ensure cookies are set
				setTimeout(() => {
					goto('/dashboard');
				}, 1000);
			} else {
				// Try to get the session from the URL hash (for OAuth flows)
				const hashParams = new URLSearchParams(window.location.hash.substring(1));
				const accessToken = hashParams.get('access_token');
				const refreshToken = hashParams.get('refresh_token');

				if (accessToken && refreshToken) {
					status = 'Setting up session from tokens...';

					const { data, error: setSessionError } = await supabase.auth.setSession({
						access_token: accessToken,
						refresh_token: refreshToken
					});

					if (setSessionError) {
						throw setSessionError;
					}

					if (data.session) {
						status = 'Redirecting to dashboard...';
						setTimeout(() => {
							goto('/dashboard');
						}, 1000);
					} else {
						throw new Error('Failed to establish session from tokens');
					}
				} else {
					throw new Error('No authentication session found');
				}
			}
		} catch (err) {
			console.error('Auth callback error:', err);
			error = (err as Error).message || 'Authentication failed';
			status = 'Error occurred';
		}
	});
</script>

<svelte:head>
	<title>Authenticating... | Look Palette</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-white">
	<div class="text-center max-w-md">
		<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-4"></div>
		<p class="inter text-gray-600 mb-2">{status}</p>

		{#if error}
			<p class="inter text-red-600 text-sm mb-4">{error}</p>
			<div class="space-y-2">
				<button
					onclick={() => goto('/signin')}
					class="px-4 py-2 bg-black text-white rounded hover:opacity-80 mr-2"
				>
					Go to Sign In
				</button>
				<button
					onclick={() => goto('/signup')}
					class="px-4 py-2 bg-gray-200 text-black rounded hover:opacity-80"
				>
					Try Sign Up Again
				</button>
			</div>
		{/if}
	</div>
</div>
