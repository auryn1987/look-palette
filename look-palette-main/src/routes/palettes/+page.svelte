<script lang="ts">
	import { heroSeasonalPalettes } from '$lib/heroSeasonalPalettes';
</script>

<svelte:head>
	<title>Seasonal Color Palettes | Look Palette</title>
	<meta
		name="description"
		content="Explore our comprehensive collection of seasonal color palettes including Spring, Summer, Autumn, and Winter variations."
	/>
</svelte:head>

<header class="text-center mb-8 relative overflow-hidden bg-gray-800" style="min-height: 300px;">
	<img
		src="/hero/hero-image-palettes.avif"
		alt="Hero background"
		class="absolute inset-0 w-full h-full object-cover"
	/>

	<div class="relative z-10 py-16 px-8">
		<h1 class="inter mt-2 text-5xl font-semibold tracking-tight text-pretty text-black md:text-6xl">
			Seasonal Color Palettes
		</h1>
		<p class="inter text-xl text-black max-w-7xl mx-auto mt-6">
			The 12-seasonal color analysis expands on the traditional four-season model by dividing each
			main season—Spring, Summer, Autumn, and Winter—into three nuanced subtypes, capturing subtle
			variations in warmth, coolness, brightness, and softness.
		</p>
	</div>
</header>
<div class="max-w-7xl mx-auto p-4 md:p-8 py-4 md:py-8">
	<!-- Seasonal Palettes -->

	{#each heroSeasonalPalettes as season}
		<section class="mb-24">
			<div class="text-center mb-12">
				<h2 class="inter text-4xl font-semibold text-black mb-4">{season.name}</h2>
				<p class="inter text-lg text-gray-700 max-w-3xl mx-auto">{season.description}</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
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
						<div class="p-6">
							<h3 class="text-xl font-semibold text-gray-900 mb-2">{subtype.name}</h3>
							<p class="text-gray-600 mb-4">{subtype.description}</p>
							<a
								href="/palettes/{subtype.slug}"
								class="mt-10 block rounded-md bg-black px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
							>
								View Palette
							</a>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>
