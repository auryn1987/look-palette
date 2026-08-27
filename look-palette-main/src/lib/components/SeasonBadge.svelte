<script lang="ts">
	let { season, description } = $props<{
		season: string;
		description?: string;
	}>();

	// Extract base season from 12-season system
	const baseSeason = season.includes('Spring')
		? 'Spring'
		: season.includes('Summer')
			? 'Summer'
			: season.includes('Autumn')
				? 'Autumn'
				: season.includes('Winter')
					? 'Winter'
					: 'Spring'; // fallback

	const seasonColors = {
		Spring: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
		Summer: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
		Autumn: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
		Winter: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' }
	};

	const colors = seasonColors[baseSeason as keyof typeof seasonColors];
</script>

<div
	class="svelte-component inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border {colors.bg} {colors.text} {colors.border}"
>
	<span class="mr-1">🎨</span>
	{season}
	{#if description}
		<span class="ml-1 text-xs opacity-75">- {description}</span>
	{/if}
</div>
