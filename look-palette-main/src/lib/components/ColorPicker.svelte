<script lang="ts">
	let selectedColor = $state('#3B82F6');
	let colors = [
		{ name: 'Blue', value: '#3B82F6' },
		{ name: 'Red', value: '#EF4444' },
		{ name: 'Green', value: '#10B981' },
		{ name: 'Purple', value: '#8B5CF6' },
		{ name: 'Pink', value: '#EC4899' },
		{ name: 'Yellow', value: '#F59E0B' },
		{ name: 'Indigo', value: '#6366F1' },
		{ name: 'Teal', value: '#14B8A6' }
	];
</script>

<div class="svelte-component bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
	<h3 class="text-xl font-semibold text-gray-900 mb-4">Interactive Color Picker</h3>

	<div class="mb-4">
		<div
			class="w-full h-32 rounded-lg border-2 border-gray-300 shadow-inner"
			style="background-color: {selectedColor};"
		></div>
	</div>

	<div class="grid grid-cols-4 gap-2 mb-4">
		{#each colors as color}
			<button
				class="w-16 h-16 rounded-lg border-2 transition-all duration-200 hover:scale-105 {selectedColor ===
				color.value
					? 'border-gray-800 shadow-lg'
					: 'border-gray-300'}"
				style="background-color: {color.value};"
				onclick={() => (selectedColor = color.value)}
				aria-label="Select {color.name} color"
				title={color.name}
			></button>
		{/each}
	</div>

	<div class="text-center">
		<p class="text-sm text-gray-600">Selected Color: <strong>{selectedColor}</strong></p>
		<p class="text-xs text-gray-500 mt-1">Click on any color above to see it in action!</p>
	</div>
</div>

<style>
	button {
		cursor: pointer;
	}

	button:hover {
		transform: scale(1.05);
	}
</style>
