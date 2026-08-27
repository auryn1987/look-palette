<script lang="ts">
	import type { PageData } from './$types';
	import { tagToSlug } from '$lib/functions';

	let { data } = $props<{ data: PageData }>();
	let posts = $derived(data.posts);
</script>

<svelte:head>
	<title>Blog | Look Palette</title>
	<meta name="description" content="Blog | Look Palette" />
</svelte:head>

<header class="text-center mb-8 relative overflow-hidden bg-gray-800" style="min-height: 300px;">
	<img
		src="/hero/hero-image-blog.avif"
		alt="Blog | Look Palette"
		class="absolute inset-0 w-full h-full object-cover"
	/>

	<div class="relative z-10 py-16 px-8">
		<h1 class="inter mt-2 text-5xl md:text-6xl font-semibold tracking-tight text-pretty text-black">
			Blog
		</h1>
		<p class="inter text-xl text-black max-w-7xl mx-auto mt-6">
			A collection of articles about seasonal color analysis and how to use it to enhance your
			natural beauty.
		</p>
	</div>
</header>

<div class="max-w-7xl mx-auto p-4 md:p-8 py-4 md:py-8">
	<main class="space-y-16">
		<!-- Featured Post -->
		{#if posts.length > 0}
			<section class="mb-16 max-w-5xl mx-auto">
				<h2 class="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
				<div class="grid grid-cols-1 gap-8">
					{#each posts.slice(0, 1) as post}
						<article
							class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
						>
							{#if post.image}
								<a href={`/blog/${post.slug}`} class="block">
									<img
										src={post.image}
										alt={post.title}
										class="w-full aspect-[1.9/1] object-cover"
									/>
								</a>
							{/if}
							<div class="p-6">
								<div class="flex items-center text-sm text-gray-600 mb-3">
									<span>{post.author}</span>
									<span class="mx-2">•</span>
									<time datetime={post.date}>
										{new Date(post.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</time>
								</div>
								<h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
									<a href={`/blog/${post.slug}`} class="hover:text-gray-700 transition-colors">
										{post.title}
									</a>
								</h3>
								<p class="text-gray-600 mb-4 line-clamp-3">
									{post.description}
								</p>
								{#if post.tags && post.tags.length > 0}
									<div class="flex flex-wrap gap-2">
										{#each post.tags.slice(0, 3) as tag}
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
				</div>
			</section>
		{/if}

		<!-- All Posts Grid -->
		<section>
			<h2 class="text-2xl font-bold text-gray-900 mb-8">All Articles</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each posts.slice(1) as post}
					<article
						class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
					>
						{#if post.image}
							<a href={`/blog/${post.slug}`} class="block">
								<img src={post.image} alt={post.title} class="w-full aspect-[1.9/1] object-cover" />
							</a>
						{/if}
						<div class="p-6">
							<div class="flex items-center text-sm text-gray-600 mb-3">
								<span>{post.author}</span>
								<span class="mx-2">•</span>
								<time datetime={post.date}>
									{new Date(post.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							</div>
							<h3 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
								<a href={`/blog/${post.slug}`} class="hover:text-gray-700 transition-colors">
									{post.title}
								</a>
							</h3>
							<p class="text-gray-600 mb-4 line-clamp-3">
								{post.description}
							</p>
							{#if post.tags && post.tags.length > 0}
								<div class="flex flex-wrap gap-2">
									{#each post.tags.slice(0, 2) as tag}
										<a
											href="/blog/tag/{tagToSlug(tag)}"
											class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
											onclick={(e) => e.stopPropagation()}
										>
											{tag}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>
	</main>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
