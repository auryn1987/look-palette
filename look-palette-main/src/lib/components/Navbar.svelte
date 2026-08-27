<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabase';

	let { user = null } = $props<{ user?: User | null }>();

	let drawer = $state<HTMLInputElement | null>(null);

	function closeDrawer() {
		if (drawer) {
			drawer.checked = false;
		}
		// Ensure body scroll is restored
		restoreBodyScroll();
	}

	function restoreBodyScroll() {
		// Remove any overflow hidden that might have been added by the drawer
		document.body.style.overflow = '';
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.width = '';
	}

	// Listen for drawer state changes and screen resize
	$effect(() => {
		if (drawer) {
			const handleChange = () => {
				if (!drawer?.checked) {
					// When drawer is closed, restore body scroll
					restoreBodyScroll();
				}
			};

			const handleResize = () => {
				// If screen is wide enough that drawer shouldn't be visible, restore scroll
				if (window.innerWidth >= 1024) {
					// lg breakpoint
					restoreBodyScroll();
					if (drawer?.checked) {
						drawer.checked = false;
					}
				}
			};

			drawer.addEventListener('change', handleChange);
			window.addEventListener('resize', handleResize);

			// Cleanup function
			return () => {
				drawer?.removeEventListener('change', handleChange);
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	// Also restore scroll when component is destroyed
	onMount(() => {
		return () => {
			restoreBodyScroll();
		};
	});
</script>

<div class="navbar bg-black py-4 text-white border-b border-black">
	<div class="mx-auto max-w-7xl flex w-full items-center justify-between px-2 sm:px-0">
		<!-- Logo -->
		<a
			href="/"
			class="oswald font-semibold tracking-wide text-3xl text-white hover:opacity-80 md:text-4xl"
			>LOOK PALETTE</a
		>

		<!-- Desktop Navigation - Middle -->
		<div class="hidden lg:flex items-center gap-8">
			<a href="/" class="inter text-md text-white hover:opacity-80">Home</a>
			<a href="/tools/seasonal-color-analysis" class="inter text-md text-white hover:opacity-80"
				>Seasonal Color Analysis</a
			>
			<div class="dropdown dropdown-hover">
				<a href="/palettes" class="inter text-md text-white hover:opacity-80"> Palettes </a>
				<ul class="dropdown-content menu bg-black rounded-box z-[1] w-52 p-2 shadow">
					<li class="menu-title">
						<p class="inter text-md font-semibold text-white">Spring Palettes</p>
					</li>
					<li class="ml-4">
						<a href="/palettes/clear-spring" class="inter text-md hover:bg-white hover:text-black"
							>Clear Spring</a
						>
					</li>
					<li class="ml-4">
						<a href="/palettes/warm-spring" class="inter text-md hover:bg-white hover:text-black"
							>Warm Spring</a
						>
					</li>
					<li class="ml-4">
						<a href="/palettes/light-spring" class="inter text-md hover:bg-white hover:text-black"
							>Light Spring</a
						>
					</li>
					<li class="menu-title">
						<p class="inter text-md font-semibold text-white">Summer Palettes</p>
					</li>
					<li class="ml-4">
						<a href="/palettes/light-summer" class="inter text-md hover:bg-white hover:text-black"
							>Light Summer</a
						>
					</li>
					<li class="ml-4">
						<a href="/palettes/cool-summer" class="inter text-md hover:bg-white hover:text-black"
							>Cool Summer</a
						>
					</li>
					<li class="ml-4">
						<a href="/palettes/soft-summer" class="inter text-md hover:bg-white hover:text-black"
							>Soft Summer</a
						>
					</li>
					<li class="menu-title">
						<p class="inter text-md font-semibold text-white">Autumn Palettes</p>
					</li>
					<li class="ml-4">
						<a href="/palettes/soft-autumn" class="inter text-md hover:bg-white hover:text-black"
							>Soft Autumn</a
						>
					</li>
					<li class="ml-4">
						<a href="/palettes/warm-autumn" class="inter text-md hover:bg-white hover:text-black"
							>Warm Autumn</a
						>
					</li>
					<li class="ml-4">
						<a href="/palettes/deep-autumn" class="inter text-md hover:bg-white hover:text-black"
							>Deep Autumn</a
						>
					</li>
					<li class="menu-title">
						<p class="inter text-md font-semibold text-white">Winter Palettes</p>
					</li>
					<li class="ml-4">
						<a href="/palettes/deep-winter" class="inter text-md hover:bg-white hover:text-black"
							>Deep Winter</a
						>
					</li>
					<li class="ml-4">
						<a href="/palettes/cool-winter" class="inter text-md hover:bg-white hover:text-black"
							>Cool Winter</a
						>
					</li>
					<li class="ml-4">
						<a href="/palettes/clear-winter" class="inter text-md hover:bg-white hover:text-black"
							>Clear Winter</a
						>
					</li>
				</ul>
			</div>

			<!--a href="/pricing" class="inter text-md text-white hover:opacity-80">Pricing</a-->
			<a href="/blog" class="inter text-md text-white hover:opacity-80">Blog</a>
		</div>

		<!-- Desktop Action Buttons - Right -->
		<div class="hidden lg:flex items-center gap-4">
			{#if user}
				<a href="/dashboard" class="inter text-md text-white hover:opacity-80">Dashboard</a>
				<button
					onclick={async () => {
						await supabase.auth.signOut();
						window.location.href = '/';
					}}
					class="inter text-md bg-black text-white px-4 py-2 hover:opacity-80 border border-white"
				>
					Sign Out
				</button>
			{:else}
				<a href="/signin" class="inter text-md text-white hover:opacity-80">Sign-In</a>
				<a
					href="/signup"
					class="inter text-md bg-black text-white px-4 py-2 hover:opacity-80 border border-white"
					>Get Started</a
				>
			{/if}
		</div>

		<!-- Mobile Menu Button -->
		<div class="flex items-center gap-4 lg:hidden">
			<div class="drawer drawer-end">
				<input id="my-drawer-4" type="checkbox" class="drawer-toggle" bind:this={drawer} />
				<div class="drawer-content">
					<label for="my-drawer-4" class="btn btn-ghost hover:bg-white hover:text-black">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-5 w-5 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					</label>
				</div>
				<div class="drawer-side z-20">
					<label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
					<ul class="menu bg-black text-white min-h-full w-80 p-4">
						{#if user}
							<li>
								<a
									href="/dashboard"
									class="inter text-lg hover:bg-white hover:text-black"
									onclick={closeDrawer}>Dashboard</a
								>
							</li>
							<li>
								<button
									onclick={async () => {
										await supabase.auth.signOut();
										window.location.href = '/';
										closeDrawer();
									}}
									class="inter text-lg hover:bg-white hover:text-black w-full text-left"
								>
									Sign Out
								</button>
							</li>
						{:else}
							<li>
								<a
									href="/signin"
									class="inter text-lg hover:bg-white hover:text-black"
									onclick={closeDrawer}>Sign-In</a
								>
							</li>
							<li>
								<a
									href="/signup"
									class="inter text-lg hover:bg-white hover:text-black"
									onclick={closeDrawer}>Get Started</a
								>
							</li>
						{/if}
						<hr class="my-4 border-white" />
						<li>
							<a
								href="/"
								class="inter text-lg hover:bg-white hover:text-black"
								onclick={closeDrawer}>Home</a
							>
						</li>
						<li>
							<a
								href="/tools/seasonal-color-analysis"
								class="inter text-lg hover:bg-white hover:text-black"
								onclick={closeDrawer}>Seasonal Color Analysis</a
							>
						</li>

						<li>
							<a
								href="/palettes"
								class="inter text-lg hover:bg-white hover:text-black"
								onclick={closeDrawer}>Palettes</a
							>
						</li>

						<li>
							<a
								href="/about"
								class="inter text-lg hover:bg-white hover:text-black"
								onclick={closeDrawer}>About</a
							>
						</li>

						<li>
							<a
								href="/blog"
								class="inter text-lg hover:bg-white hover:text-black"
								onclick={closeDrawer}>Blog</a
							>
						</li>
						<li>
							<a
								href="/contact"
								class="inter text-lg hover:bg-white hover:text-black"
								onclick={closeDrawer}>Contact</a
							>
						</li>
						<li>
							<a
								href="/faq"
								class="inter text-lg hover:bg-white hover:text-black"
								onclick={closeDrawer}>FAQ</a
							>
						</li>
						<!--li>
							<a
								href="/pricing"
								class="inter text-lg hover:bg-white hover:text-black"
								onclick={closeDrawer}>Pricing</a
							>
						</li-->
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
