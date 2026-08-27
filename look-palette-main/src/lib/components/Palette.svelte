<script lang="ts">
	import {
		palettesHex16,
		palettesHex24,
		palettesHex32,
		palettesHex40,
		palettesHex48,
		palettesHex56,
		palettesHex64
	} from '$lib/palettes';

	// Props
	let { paletteName } = $props<{
		paletteName: string;
	}>();

	// Available palette sizes
	const paletteSizes = [
		{ value: 16, label: '16 Colors' },
		{ value: 24, label: '24 Colors' },
		{ value: 32, label: '32 Colors' },
		{ value: 40, label: '40 Colors' },
		{ value: 48, label: '48 Colors' },
		{ value: 56, label: '56 Colors' },
		{ value: 64, label: '64 Colors' }
	];

	// Get the correct palette data based on name
	function getPaletteData(size: number) {
		const paletteMap = {
			16: palettesHex16,
			24: palettesHex24,
			32: palettesHex32,
			40: palettesHex40,
			48: palettesHex48,
			56: palettesHex56,
			64: palettesHex64
		};

		const palettes = paletteMap[size as keyof typeof paletteMap];
		if (!palettes) {
			return null;
		}

		// Search through all seasons for the palette
		for (const season of Object.values(palettes)) {
			const found = season.find(
				(palette) =>
					palette.name.toLowerCase().replace(/\s+/g, '-') ===
					paletteName.toLowerCase().replace(/\s+/g, '-')
			);
			if (found) {
				return found;
			}
		}

		return null;
	}

	// Reactive state
	let selectedSize = $state(64);
	let currentPalette = $derived(getPaletteData(selectedSize));

	// Redirect if palette not found
	$effect(() => {
		if (!currentPalette) {
			window.location.href = '/palettes';
		}
	});

	function copyColor(color: string) {
		navigator.clipboard.writeText(color);
		// You could add a toast notification here
	}
</script>

<!-- Header with dropdown -->
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
	<div>
		<h2 class="text-2xl font-semibold text-gray-900 mb-2">Color Palette</h2>
		<p class="text-gray-600">Select the number of colors to display</p>
	</div>

	<div class="flex items-center gap-3">
		<label for="palette-size" class="text-sm font-medium text-gray-700">Palette Size:</label>
		<select
			id="palette-size"
			bind:value={selectedSize}
			class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
		>
			{#each paletteSizes as size}
				<option value={size.value}>{size.label}</option>
			{/each}
		</select>
	</div>
</div>

<!-- Palette Grid -->
{#if currentPalette}
	<div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
		{#each currentPalette.colors as color}
			<!-- Color Swatch -->
			<div
				class="w-full h-20 sm:h-24 border border-gray-200"
				style="background-color: {color}"
			></div>
		{/each}
	</div>
{/if}
