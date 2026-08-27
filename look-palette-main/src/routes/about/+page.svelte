<script lang="ts">
</script>

<svelte:head>
	<title>About | Look Palette</title>
	<meta name="description" content="About Look Palette" />
</svelte:head>

<header class="text-center mb-8 relative overflow-hidden bg-gray-800" style="min-height: 300px;">
	<img
		src="/hero/hero-image-about.avif"
		alt="About Look Palette"
		class="absolute inset-0 w-full h-full object-cover"
	/>

	<div class="relative z-10 py-16 px-4 md:px-8">
		<h1 class="inter mt-2 text-5xl font-semibold tracking-tight text-pretty text-black md:text-6xl">
			About
		</h1>
		<p class="inter text-xl text-black max-w-7xl mx-auto mt-6">
			We're passionate about helping you discover your unique beauty through the science of seasonal
			color analysis.
		</p>
	</div>
</header>
<div class="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
	<main class="space-y-16">
		<!-- Our Story -->
		<section class="grid md:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">Our Story</h2>
				<p class="text-gray-600 mb-4">
					Look Palette was born from a simple belief: everyone deserves to feel confident and
					beautiful in their own skin. Founded by a team of color enthusiasts and fashion
					professionals, we recognized that traditional color analysis was often inaccessible,
					expensive, and intimidating.
				</p>
				<p class="text-gray-600 mb-4">
					We set out to democratize this transformative knowledge by creating an intuitive,
					comprehensive questionnaire that guides you through discovering your perfect colors. What
					started as a passion project has grown into a trusted platform helping thousands of people
					unlock their natural beauty.
				</p>
				<p class="text-gray-600">
					Today, we're proud to offer a thoughtful, step-by-step approach that combines time-tested
					color theory with personalized guidance to deliver results that truly work for your unique
					coloring.
				</p>
			</div>
			<div class="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8">
				<div class="text-center">
					<h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
					<p class="text-gray-700">
						To empower everyone to discover their unique beauty through accessible, accurate, and
						affordable color analysis.
					</p>
				</div>
			</div>
		</section>

		<!-- What We Do -->
		<section class="bg-gray-50 rounded-2xl p-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
				<p class="text-xl text-gray-600">
					We provide a comprehensive questionnaire-based seasonal color analysis to help you look
					and feel your best.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center">
					<div
						class="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg"
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
					<h3 class="text-xl font-semibold text-gray-900 mb-3">Color Analysis</h3>
					<p class="text-gray-600">
						Our detailed questionnaire guides you through analyzing your natural features to
						determine your perfect color season and palette.
					</p>
				</div>

				<div class="text-center">
					<div
						class="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg"
					>
						<svg
							class="w-8 h-8 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							></path>
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-3">Education</h3>
					<p class="text-gray-600">
						Step-by-step guidance and resources to help you understand and apply color theory to
						your daily life.
					</p>
				</div>

				<div class="text-center">
					<div
						class="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg"
					>
						<svg
							class="w-8 h-8 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
							></path>
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-3">Tools</h3>
					<p class="text-gray-600">
						Interactive tools including color pickers, palette generators, and comparison features
						to enhance your questionnaire experience.
					</p>
				</div>
			</div>
		</section>

		<!-- Our Values -->
		<section>
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
				<p class="text-xl text-gray-600">The principles that guide everything we do</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				<div class="text-center">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">Accessibility</h3>
					<p class="text-gray-600 text-sm">
						Making color analysis available to everyone, regardless of location or budget.
					</p>
				</div>

				<div class="text-center">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">Accuracy</h3>
					<p class="text-gray-600 text-sm">
						Providing reliable, science-based results that you can trust and depend on.
					</p>
				</div>

				<div class="text-center">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">Education</h3>
					<p class="text-gray-600 text-sm">
						Empowering you with knowledge to make informed decisions about your appearance.
					</p>
				</div>

				<div class="text-center">
					<h3 class="text-lg font-semibold text-gray-900 mb-3">Confidence</h3>
					<p class="text-gray-600 text-sm">
						Helping you feel beautiful and confident in your own unique way.
					</p>
				</div>
			</div>
		</section>

		<!-- Why Seasonal Color Analysis -->
		<section class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h2 class="text-3xl font-bold text-gray-900 mb-6">Why Seasonal Color Analysis?</h2>
					<p class="text-gray-600 mb-4">
						Seasonal color analysis isn't just about looking good—it's about feeling confident and
						authentic. When you wear colors that complement your natural coloring, you look more
						vibrant, healthy, and put-together.
					</p>
					<p class="text-gray-600 mb-6">
						Our questionnaire-based approach helps you make better decisions about clothing, makeup,
						and accessories, saving you time and money while building a wardrobe that truly works
						for you.
					</p>
					<div class="space-y-3">
						<div class="flex items-center">
							<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
							<span class="text-gray-700">Look more vibrant and healthy</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
							<span class="text-gray-700">Simplify shopping decisions</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
							<span class="text-gray-700">Build a cohesive wardrobe</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
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
					<div class="bg-white rounded-2xl p-4 shadow-lg">
						<h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Colors?</h3>
						<p class="text-gray-600 mb-6">
							Take our comprehensive questionnaire and unlock your unique beauty potential.
						</p>
						<a href="/tools/seasonal-color-analysis" class="btn btn-primary btn-md md:btn-lg">
							Start Your Questionnaire
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Team/Contact CTA -->
		<section class="text-center bg-gray-900 text-white rounded-2xl p-12">
			<h2 class="text-3xl font-bold mb-4">Have Questions?</h2>
			<p class="text-xl text-gray-300 mb-8">Our team is here to help you on your color journey.</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/contact" class="btn btn-outline btn-lg"> Contact Us </a>
				<a href="/faq" class="btn btn-primary btn-lg"> View FAQ </a>
			</div>
		</section>
	</main>
</div>
