import type { BlogPost } from './types';
import { marked } from 'marked';
import matter from 'gray-matter';

// Get all posts sorted by date (newest first)
export async function getAllPosts(): Promise<BlogPost[]> {
	// Dynamically discover all mdsvex page routes (directories with +page.svx)
	const mdsvexPageModules = import.meta.glob('../routes/blog/*/+page.svx', {
		query: '?raw',
		import: 'default'
	});

	// Use mdsvex page modules
	const allModules = mdsvexPageModules;

	const posts = await Promise.all(
		Object.entries(allModules).map(async ([path, getContent]) => {
			try {
				const content = (await getContent()) as string;
				const { data: metadata } = matter(content);

				// Extract slug from route directory: ../routes/blog/slug/+page.svx
				const pathParts = path.split('/');
				const blogIndex = pathParts.findIndex((part) => part === 'blog');
				const slug = blogIndex !== -1 && pathParts[blogIndex + 1] ? pathParts[blogIndex + 1] : null;

				if (!slug) return null;

				return {
					slug,
					title: metadata.title || 'Untitled',
					description: metadata.description || '',
					date: metadata.date || '2024-01-01',
					author: metadata.author || 'Look Palette Team',
					tags: metadata.tags || [],
					image: metadata.image || '/hero/hero-image-blog.avif',
					component: null
				} as BlogPost;
			} catch (error) {
				console.error('Error processing post:', path, error);
				return null;
			}
		})
	);

	// Filter out any null posts and sort by date (newest first)
	const validPosts = posts.filter((post): post is BlogPost => post !== null);
	return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
	try {
		// Load .svx file from route directory
		const content = await import(`../routes/blog/${slug}/+page.svx?raw`);
		const { data: metadata } = matter(content.default as string);

		return {
			slug,
			title: metadata.title || 'Untitled',
			description: metadata.description || '',
			date: metadata.date || '2024-01-01',
			author: metadata.author || 'Look Palette Team',
			tags: metadata.tags || [],
			image: metadata.image || '/hero/hero-image-blog.avif',
			component: null
		} as BlogPost;
	} catch (error) {
		console.error(`Error loading post ${slug}:`, error);
		return undefined;
	}
}

// Get featured posts (first 2)
export async function getFeaturedPosts(): Promise<BlogPost[]> {
	const allPosts = await getAllPosts();
	return allPosts.slice(0, 2);
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
	const allPosts = await getAllPosts();
	return allPosts.filter(
		(post) => post.tags && post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
	);
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
	const allPosts = await getAllPosts();
	const tagSet = new Set<string>();

	allPosts.forEach((post) => {
		if (post.tags) {
			post.tags.forEach((tag) => tagSet.add(tag));
		}
	});

	return Array.from(tagSet).sort();
}

// Load a blog post content
export async function loadBlogPost(slug: string): Promise<{ content: string; metadata: any }> {
	try {
		// Load .svx file from route directory
		const rawContent = await import(`../routes/blog/${slug}/+page.svx?raw`);
		const { data: metadata, content } = matter(rawContent.default as string);

		// For .svx files, return raw content as it will be processed by mdsvex
		return {
			content,
			metadata
		};
	} catch (error) {
		console.error(`Error loading blog post ${slug}:`, error);
		throw new Error(`Post not found: ${slug}`);
	}
}
