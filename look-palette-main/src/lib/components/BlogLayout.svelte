<script lang="ts">
	import { tagToSlug } from '$lib/functions';

	// These props will be automatically provided by mdsvex from the frontmatter
	let { title, description, date, author, tags, image, children } = $props<{
		title?: string;
		description?: string;
		date?: string;
		author?: string;
		tags?: string[];
		image?: string;
		children?: import('svelte').Snippet;
	}>();

	// Set defaults
	const finalTitle = title || 'Untitled';
	const finalDescription = description || '';
	const finalDate = date || '2024-01-01';
	const finalAuthor = author || 'Look Palette Team';
	const finalTags = tags || [];
	const finalImage = image || '/hero/hero-image-blog.avif';
</script>

<svelte:head>
	<title>{finalTitle} | Look Palette Blog</title>
	<meta name="description" content={finalDescription} />
	<meta property="og:title" content={finalTitle} />
	<meta property="og:description" content={finalDescription} />
	<meta property="og:image" content={finalImage} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={finalTitle} />
	<meta name="twitter:description" content={finalDescription} />
	<meta name="twitter:image" content={finalImage} />
</svelte:head>

<article class="max-w-5xl mx-auto px-6 lg:px-8 py-8">
	<header class="mb-8">
		<div class="mb-4">
			<a href="/blog" class="text-gray-600 hover:text-gray-800 transition-colors">
				← Back to Blog
			</a>
		</div>

		<h1 class="inter text-4xl font-bold text-gray-900 mb-4">{finalTitle}</h1>

		<div class="flex items-center text-gray-600 mb-6">
			<span>By {finalAuthor}</span>
			<span class="mx-2">•</span>
			<time datetime={finalDate}
				>{new Date(finalDate).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</time
			>
		</div>

		{#if finalTags.length > 0}
			<div class="flex flex-wrap gap-2 mb-6">
				{#each finalTags as tag}
					<a
						href="/blog/tag/{tagToSlug(tag)}"
						class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
					>
						{tag}
					</a>
				{/each}
			</div>
		{/if}

		{#if finalImage}
			<img
				src={finalImage}
				alt={finalTitle}
				class="w-full aspect-[1.9/1] object-cover rounded-lg mb-6"
			/>
		{/if}
	</header>

	<div class="prose prose-lg max-w-none blog-content" style="max-width: none !important;">
		{@render children?.()}
	</div>

	<footer class="mt-12 pt-8 border-t border-gray-200">
		<div class="flex items-center justify-between">
			<div class="text-sm text-gray-600">
				<p>Written by {finalAuthor}</p>
				<p>
					Published on {new Date(finalDate).toLocaleDateString('en-US', {
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

	/* Additional styling for Svelte components in blog content */
	:global(.blog-content .svelte-component) {
		margin: 2rem 0;
	}

	:global(.blog-content h2) {
		font-size: 1.875rem;
		font-weight: 700;
		margin: 2rem 0 1rem 0;
		color: #111827;
	}

	:global(.blog-content h3) {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: #111827;
	}

	:global(.blog-content p) {
		margin: 1rem 0;
		line-height: 1.75;
		color: #374151;
	}

	:global(.blog-content blockquote) {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
	}

	:global(.blog-content code) {
		background-color: #f3f4f6;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-family: 'Courier New', monospace;
		font-size: 0.875rem;
	}

	:global(.blog-content pre) {
		background-color: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	:global(.blog-content pre code) {
		background-color: transparent;
		padding: 0;
		color: inherit;
	}
</style>
