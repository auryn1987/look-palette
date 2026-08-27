<script lang="ts">
	import { signInWithGoogle } from '$lib/auth';

	export let mode: 'signin' | 'signup' = 'signin';
	export let title: string;
	export let subtitle: string;
	export let submitButtonText: string;

	// Form data
	let formData = {
		email: ''
	};

	// State management
	let isSubmitting = false;
	let isSuccess = false;
	let errorMessage = '';
	let successMessage = '';

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!formData.email) {
			errorMessage = 'Please enter your email address.';
			return;
		}

		// Reset states
		isSubmitting = true;
		errorMessage = '';
		successMessage = '';

		try {
			// Send magic link request
			const response = await fetch('/api/auth/magic-link', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: formData.email,
					mode: mode
				})
			});

			const data = await response.json();

			if (response.ok) {
				isSuccess = true;
				successMessage = `Magic link sent! Check your email at ${formData.email} and click the link to access your account.`;
				formData.email = ''; // Clear the form
			} else {
				errorMessage = data.error || `Failed to send magic link. Please try again.`;
			}
		} catch (error) {
			errorMessage = 'An error occurred. Please check your connection and try again.';
		} finally {
			isSubmitting = false;
		}
	}

	async function handleGoogleSignIn() {
		try {
			const result = await signInWithGoogle();

			if (!result.success) {
				errorMessage = result.error || 'Failed to sign in with Google';
			}
			// If successful, Supabase will redirect to the callback URL
		} catch (error) {
			errorMessage = 'An error occurred while signing in with Google';
		}
	}
</script>

<svelte:head>
	<title>{title} | Look Palette</title>
	<meta name="description" content={subtitle} />
</svelte:head>

<div
	class="isolate bg-white px-6 py-8 sm:py-10 lg:px-8"
	style="background-image: url('/hero/hero-image-auth.avif'); background-size: cover; background-position: center; background-repeat: no-repeat;"
>
	<h2
		class="inter text-center text-5xl font-semibold tracking-tight mt-2 text-balance text-black sm:text-6xl"
	>
		{title}
	</h2>
	<p class="inter mt-4 text-center text-lg text-black mb-8 sm:text-xl">
		{subtitle}
	</p>

	<div class="mx-auto max-w-2xl bg-white rounded-3xl shadow-lg ring-1 ring-gray-900/5 p-8 mb-20">
		{#if isSuccess}
			<!-- Success State -->
			<div class="mx-auto max-w-xl text-center">
				<div class="mb-6">
					<svg
						class="mx-auto h-12 w-12 text-green-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="inter text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
				<p class="inter text-sm text-gray-600 mb-6">{successMessage}</p>
				<button
					type="button"
					onclick={() => {
						isSuccess = false;
					}}
					class="inter text-sm font-medium text-black hover:underline"
				>
					Send another link
				</button>
			</div>
		{:else}
			<!-- Form State -->
			<form onsubmit={handleSubmit} class="mx-auto max-w-xl">
				{#if errorMessage}
					<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
						<p class="inter text-sm text-red-600">{errorMessage}</p>
					</div>
				{/if}

				<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div class="sm:col-span-2">
						<label for="email" class="inter block text-sm/6 font-semibold text-black">Email</label>
						<div class="mt-2.5">
							<input
								id="email"
								type="email"
								name="email"
								autocomplete="email"
								bind:value={formData.email}
								disabled={isSubmitting}
								class="inter block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black disabled:opacity-50 disabled:cursor-not-allowed"
								placeholder="Enter your email address"
							/>
						</div>
					</div>

					<div class="sm:col-span-2">
						<button
							type="submit"
							disabled={isSubmitting}
							class="block w-full rounded-md bg-black px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
						>
							{#if isSubmitting}
								<div class="flex items-center justify-center gap-2">
									<svg
										class="animate-spin h-4 w-4 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Sending...
								</div>
							{:else}
								{submitButtonText}
							{/if}
						</button>
					</div>
				</div>

				<div class="mt-10">
					<div class="relative">
						<div aria-hidden="true" class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
						</div>
						<div class="relative flex justify-center text-sm/6 font-medium">
							<span class="bg-white px-6 text-gray-900"> Or continue with </span>
						</div>
					</div>
				</div>

				<div class="mt-10">
					<button
						type="button"
						onclick={handleGoogleSignIn}
						disabled={isSubmitting}
						class="flex w-full items-center justify-center gap-3 rounded-md bg-white border border-black px-3 py-2 text-center text-sm/6 font-semibold text-gray-900 shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<img src="/google.svg" alt="Google" class="h-5 w-5" />
						Google
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>
