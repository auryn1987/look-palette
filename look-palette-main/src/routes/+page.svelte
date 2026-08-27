<script lang="ts">
	import { heroSeasonalPalettes } from '$lib/heroSeasonalPalettes';

	const heroImages = [
		'/hero/hero-autumn-deep.avif',
		'/hero/hero-autumn-warm.avif',
		'/hero/hero-autumn-soft.avif',
		'/hero/hero-spring-clear.avif',
		'/hero/hero-spring-warm.avif',
		'/hero/hero-spring-light.avif',
		'/hero/hero-summer-light.avif',
		'/hero/hero-summer-cool.avif',
		'/hero/hero-summer-soft.avif',
		'/hero/hero-winter-clear.avif',
		'/hero/hero-winter-cool.avif',
		'/hero/hero-winter-deep.avif'
	];

	let heroImage = $state('/hero/hero-spring-clear.avif');
</script>

<svelte:head>
	<title>Look Palette | Discover Your Perfect Colors</title>
	<meta
		name="description"
		content="Discover your unique seasonal color palette with our comprehensive questionnaire. Find the colors that make you look and feel your best."
	/>
</svelte:head>

<!-- Hero Section -->
<header class="relative overflow-hidden bg-gray-800" style="min-height: 60vh;">
	<img
		src={heroImage}
		alt="Discover Your Perfect Colors"
		class="absolute inset-0 w-full h-full object-cover"
	/>

	{#if heroImage === '/hero/hero-spring-clear.avif' || heroImage === '/hero/hero-spring-light.avif' || heroImage === '/hero/hero-summer-light.avif' || heroImage === '/hero/hero-summer-soft.avif' || heroImage === '/hero/hero-autumn-soft.avif' || heroImage === '/hero/hero-autumn-deep.avif'}
		<div class="relative z-10 flex items-center justify-center min-h-[60vh] py-16 px-8">
			<div class="text-center max-w-5xl mx-auto">
				<h1
					class="inter text-5xl font-semibold tracking-tight text-black sm:text-6xl lg:text-7xl mb-6"
				>
					Discover Your Perfect Colors
				</h1>
				<p class="inter text-xl text-black mb-8 max-w-2xl mx-auto">
					Take our comprehensive questionnaire to find your unique seasonal color palette and unlock
					your natural beauty potential.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="/tools/seasonal-color-analysis" class="btn btn-primary btn-md lg:btn-lg">
						Start Your Seasonal Color Analysis
					</a>
				</div>
			</div>
		</div>
	{:else}
		<div class="relative z-10 flex items-center justify-center min-h-[60vh] py-16 px-8">
			<div class="text-center max-w-5xl mx-auto">
				<h1 class="inter text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
					Discover Your Perfect Colors
				</h1>
				<p class="inter text-xl text-white mb-8 max-w-2xl mx-auto">
					Take our comprehensive questionnaire to find your unique seasonal color palette and unlock
					your natural beauty potential.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="/tools/seasonal-color-analysis" class="btn btn-default btn-lg">
						Start Your Questionnaire
					</a>
					<a
						href="/about"
						class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black"
					>
						Learn More
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>

<!-- Features Section -->
<!--section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Questionnaire?</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Our comprehensive questionnaire guides you through discovering your perfect colors with
				personalized, step-by-step analysis.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<div class="text-center">
				<div
					class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
				>
					<svg
						class="w-8 h-8 text-purple-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
						></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Personalized Analysis</h3>
				<p class="text-gray-600">
					Our detailed questionnaire analyzes your natural features to determine your perfect
					seasonal palette.
				</p>
			</div>

			<div class="text-center">
				<div
					class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
				>
					<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
						></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Step-by-Step Guidance</h3>
				<p class="text-gray-600">
					Clear, easy-to-follow questions help you understand your coloring and make confident
					decisions.
				</p>
			</div>

			<div class="text-center">
				<div
					class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
				>
					<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
						></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Comprehensive Results</h3>
				<p class="text-gray-600">
					Get detailed insights about your seasonal palette, best colors, and practical styling
					tips.
				</p>
			</div>
		</div>
	</div>
</section-->

<!-- Seasonal Palettes Showcase -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 md:px-8">
		<div class="text-center mb-12">
			<h2 class="lg:text-3xl text-2xl font-bold text-gray-900 mb-4">Find Your Seasonal Palette</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Each season has unique characteristics that enhance your natural beauty.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each heroSeasonalPalettes as season}
				{#each season.subtypes as subtype}
					<div
						class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
					>
						<!-- Image -->
						<div class="aspect-square">
							<img
								src={subtype.image}
								alt="{subtype.name} color palette"
								class="w-full h-full object-cover"
							/>
						</div>

						<!-- Color Palette Swatches -->
						<div class="bg-gray-50">
							<div class="grid grid-cols-10 gap-0">
								{#each subtype.bestColors || [] as color}
									<div class="aspect-square" style="background-color: {color}" title={color}></div>
								{/each}
							</div>
						</div>

						<!-- Content -->
						<div class="p-4">
							<h3 class="text-lg font-semibold text-gray-900 mb-2">{subtype.name}</h3>
							<p class="text-gray-600 text-sm mb-3">{subtype.shortDescription}</p>
							<a
								href="/palettes/{subtype.slug}"
								class="block rounded-md bg-white border border-black px-3 py-2 text-center text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
							>
								View Palette
							</a>
						</div>
					</div>
				{/each}
			{/each}
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
	<div class="max-w-7xl mx-auto px-4 md:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Our seasonal color analysis questionnaire makes discovering your perfect seasonal color
				palette simple and enjoyable.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<div class="text-center">
				<div
					class="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold"
				>
					1
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Answer Questions</h3>
				<p class="text-gray-600">
					Our seasonal color analysis questionnaire guides you through analyzing your natural
					features, skin tone, hair color, and eye color.
				</p>
			</div>

			<div class="text-center">
				<div
					class="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold"
				>
					2
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Get Your Results</h3>
				<p class="text-gray-600">
					Receive your personalized seasonal palette with detailed explanations of your best colors
					and styling tips.
				</p>
			</div>

			<div class="text-center">
				<div
					class="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold"
				>
					3
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Start Shopping</h3>
				<p class="text-gray-600">
					Use your color palette to make confident shopping decisions and build a wardrobe that
					truly works for you.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Benefits Section -->
<section class="py-16 bg-gradient-to-r from-gray-200 to-gray-300">
	<div class="max-w-7xl mx-auto px-8">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-3xl font-bold text-gray-900 mb-6">Why Seasonal Color Analysis?</h2>
				<p class="text-gray-600 mb-6">
					When you wear colors that complement your natural coloring, you look more vibrant,
					healthy, and put-together. Our questionnaire helps you discover these perfect colors.
				</p>
				<div class="space-y-4">
					<div class="flex items-center">
						<svg class="w-5 h-5 text-black mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-gray-700">Look more vibrant and healthy</span>
					</div>
					<div class="flex items-center">
						<svg class="w-5 h-5 text-black mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-gray-700">Simplify shopping decisions</span>
					</div>
					<div class="flex items-center">
						<svg class="w-5 h-5 text-black mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-gray-700">Build a cohesive wardrobe</span>
					</div>
					<div class="flex items-center">
						<svg class="w-5 h-5 text-black mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-gray-700">Feel more confident in your appearance</span>
					</div>
				</div>
			</div>
			<div class="text-center">
				<div class="bg-white rounded-2xl p-8 shadow-lg">
					<h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Colors?</h3>
					<p class="text-gray-600 mb-6">
						Take our comprehensive questionnaire and unlock your unique beauty potential.
					</p>
					<a href="/tools/seasonal-color-analysis" class="btn btn-primary btn-lg">
						Start Your Questionnaire
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
