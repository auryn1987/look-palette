<script lang="ts">
</script>

<svelte:head>
	<title>Tools | Look Palette</title>
	<meta name="description" content="Explore our tools for color analysis and discovery" />
</svelte:head>

<header class="text-center mb-8 relative overflow-hidden bg-gray-800" style="min-height: 300px;">
	<img
		src="/hero/hero-image-tools.avif"
		alt="Tools | Look Palette"
		class="absolute inset-0 w-full h-full object-cover"
	/>

	<div class="relative z-10 py-16 px-8">
		<h1
			class="inter mt-2 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-6xl sm:text-balance"
		>
			Tools
		</h1>
		<p class="inter text-xl text-white max-w-7xl mx-auto mt-6">
			Discover your perfect colors with our comprehensive analysis tools
		</p>
	</div>
</header>

<div class="max-w-7xl mx-auto p-4 md:p-8 py-4 md:py-8">
	<main class="space-y-16">
		<!-- Introduction -->
		<section class="text-center max-w-3xl mx-auto">
			<h2 class="text-3xl font-bold text-gray-900 mb-4">Explore Our Color Tools</h2>
			<p class="text-xl text-gray-600">
				Discover your unique seasonal color palette and extract colors from images with our powerful
				and intuitive tools designed to help you look and feel your best.
			</p>
		</section>

		<!-- Tools Grid -->
		<section>
			<div class="grid md:grid-cols-2 gap-8">
				<!-- Seasonal Color Analysis Card -->
				<div
					class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
				>
					<!-- Image -->
					<div class="aspect-video">
						<img
							src="/images/seasonal-color-analysis-card.avif"
							alt=""
							class="w-full h-full object-cover"
						/>
					</div>

					<!-- Content -->
					<div class="p-8">
						<h3 class="text-2xl font-bold text-gray-900 mb-4">Seasonal Color Analysis</h3>
						<p class="text-gray-600 mb-6">
							Take our comprehensive questionnaire to discover your unique seasonal color palette.
							Learn which colors make you look and feel your best through our step-by-step analysis
							of your natural features.
						</p>
						<ul class="space-y-2 mb-6">
							<li class="flex items-center text-gray-700">
								<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									></path>
								</svg>
								Comprehensive questionnaire
							</li>
							<li class="flex items-center text-gray-700">
								<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									></path>
								</svg>
								Personalized results
							</li>
							<li class="flex items-center text-gray-700">
								<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									></path>
								</svg>
								Detailed styling tips
							</li>
						</ul>
						<a
							href="/tools/seasonal-color-analysis"
							class="btn btn-primary btn-lg w-full justify-center"
						>
							Start Analysis
						</a>
					</div>
				</div>

				<!-- Image Color Picker Card -->
				<div
					class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
				>
					<!-- Image -->
					<div class="aspect-video">
						<img src="/images/color-picker-card.avif" alt="" class="w-full h-full object-cover" />
					</div>

					<!-- Content -->
					<div class="p-8">
						<h3 class="text-2xl font-bold text-gray-900 mb-4">Image Color Picker</h3>
						<p class="text-gray-600 mb-6">
							Upload any image and extract its dominant colors to build a custom palette. Perfect
							for finding inspiration from photos, artwork, or any visual that captures your
							attention.
						</p>
						<ul class="space-y-2 mb-6">
							<li class="flex items-center text-gray-700">
								<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									></path>
								</svg>
								Extract colors from images
							</li>
							<li class="flex items-center text-gray-700">
								<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									></path>
								</svg>
								Build custom palettes
							</li>
							<li class="flex items-center text-gray-700">
								<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									></path>
								</svg>
								Export hex codes
							</li>
						</ul>
						<a href="/tools/color-picker" class="btn btn-primary btn-lg w-full justify-center">
							Open Color Picker
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Coming Soon -->
		<section class="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-12 text-center">
			<h2 class="md:text-2xl text-xl font-bold text-gray-900 mb-4">More Tools Coming Soon</h2>
			<p class="md:text-xl text-base text-gray-600 max-w-2xl mx-auto">
				We're constantly working on new tools to help you discover and work with colors. Stay tuned
				for exciting updates!
			</p>
		</section>
	</main>
</div>
