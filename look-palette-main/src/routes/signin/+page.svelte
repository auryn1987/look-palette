<script lang="ts">
	import { page } from '$app/stores';
	import AuthForm from '$lib/components/AuthForm.svelte';

	$: errorMessage = $page.url.searchParams.get('error');
</script>

{#if errorMessage}
	<div
		class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
	>
		{errorMessage}
	</div>
{/if}

<AuthForm
	mode="signin"
	title="Sign in"
	subtitle="Sign in to your account."
	submitButtonText="Continue with email"
/>
