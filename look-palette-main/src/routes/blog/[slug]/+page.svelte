<script lang="ts">
	import type { PageData } from './$types';
	import { tagToSlug } from '$lib/functions';

	let { data } = $props<{ data: PageData }>();
	let content = $derived(data.content);
	let metadata = $derived(data.metadata);
</script>

<svelte:head>
	<title>{metadata.title} | Look Palette Blog</title>
	<meta name="description" content={metadata.description} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:image" content={metadata.image} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metadata.title} />
	<meta name="twitter:description" content={metadata.description} />
	<meta name="twitter:image" content={metadata.image} />
</svelte:head>

<article class="max-w-5xl mx-auto px-6 lg:px-8 py-8">
	<header class="mb-8">
		<div class="mb-4">
			<a href="/blog" class="text-gray-600 hover:text-gray-800 transition-colors">
				← Back to Blog
			</a>
		</div>

		<h1 class="inter text-4xl font-bold text-gray-900 mb-4">{metadata.title}</h1>

		<div class="flex items-center text-gray-600 mb-6">
			<span>By {metadata.author}</span>
			<span class="mx-2">•</span>
			<time datetime={metadata.date}
				>{new Date(metadata.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</time
			>
		</div>

		{#if metadata.tags && metadata.tags.length > 0}
			<div class="flex flex-wrap gap-2 mb-6">
				{#each metadata.tags as tag}
					<a
						href="/blog/tag/{tagToSlug(tag)}"
						class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
					>
						{tag}
					</a>
				{/each}
			</div>
		{/if}

		{#if metadata.image}
			<img
				src={metadata.image}
				alt={metadata.title}
				class="w-full aspect-[1.9/1] object-cover rounded-lg mb-6"
			/>
		{/if}
	</header>

	<div class="prose prose-lg max-w-none blog-content" style="max-width: none !important;">
		{@html content}
	</div>

	<footer class="mt-12 pt-8 border-t border-gray-200">
		<div class="flex items-center justify-between">
			<div class="text-sm text-gray-600">
				<p>Written by {metadata.author}</p>
				<p>
					Published on {new Date(metadata.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</div>
			<div class="text-sm text-gray-600">
				<a href="/blog" class="text-gray-600 hover:text-gray-800 transition-colors">
					← Back to Blog
				</a>
			</div>
		</div>
	</footer>
</article>

<style>
	:global(.blog-content ul) {
		list-style-type: disc !important;
		padding-left: 1.5rem !important;
		margin: 1rem 0 !important;
	}

	:global(.blog-content ol) {
		list-style-type: decimal !important;
		padding-left: 1.5rem !important;
		margin: 1rem 0 !important;
	}

	:global(.blog-content li) {
		margin: 0.5rem 0 !important;
	}
</style>
