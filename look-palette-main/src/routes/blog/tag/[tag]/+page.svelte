<script lang="ts">
	import type { PageData } from './$types';
	import { tagToSlug } from '$lib/functions';

	let { data } = $props<{ data: PageData }>();
	let tag = $derived(data.tag);
	let posts = $derived(data.posts);
</script>

<svelte:head>
	<title>Posts tagged "{tag}" | Look Palette Blog</title>
	<meta name="description" content="Browse all blog posts tagged with {tag} on Look Palette." />
</svelte:head>

<header class="text-center mb-8 relative overflow-hidden bg-gray-800" style="min-height: 300px;">
	<img
		src="/hero/hero-image-blog.avif"
		alt="Blog | Look Palette"
		class="absolute inset-0 w-full h-full object-cover"
	/>

	<div class="relative z-10 py-16 px-8">
		<h1
			class="inter mt-2 text-5xl font-semibold tracking-tight text-pretty text-black sm:text-6xl sm:text-balance"
		>
			{tag}
		</h1>
		<p class="inter text-xl text-black max-w-7xl mx-auto mt-6">
			Posts that are tagged with {tag}
		</p>
	</div>
</header>

<div class="max-w-7xl mx-auto p-8 py-8 sm:py-12">
	<main>
		<div class="mb-8">
			<a href="/blog" class="text-gray-600 hover:text-gray-800 transition-colors">
				← Back to Blog
			</a>
		</div>

		<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each posts as post}
				<article
					class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
				>
					{#if post.image}
						<img src={post.image} alt={post.title} class="w-full aspect-[1.9/1] object-cover" />
					{/if}

					<div class="p-6">
						<div class="flex items-center text-sm text-gray-600 mb-2">
							<span>By {post.author}</span>
							<span class="mx-2">•</span>
							<time datetime={post.date}>
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
						</div>

						<h2 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
							<a href="/blog/{post.slug}" class="hover:text-gray-700 transition-colors">
								{post.title}
							</a>
						</h2>

						<p class="text-gray-600 mb-4 line-clamp-3">{post.description}</p>

						{#if post.tags && post.tags.length > 0}
							<div class="flex flex-wrap gap-2">
								{#each post.tags as tag}
									<a
										href="/blog/tag/{tagToSlug(tag)}"
										class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
									>
										{tag}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</section>

		{#if posts.length === 0}
			<div class="text-center py-12">
				<h2 class="text-2xl font-semibold text-gray-900 mb-4">No posts found</h2>
				<p class="text-gray-600 mb-6">No blog posts were found with the tag "{tag}".</p>
				<a
					href="/blog"
					class="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition-opacity"
				>
					View all posts
				</a>
			</div>
		{/if}
	</main>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-clamp: 2;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-clamp: 3;
	}
</style>
