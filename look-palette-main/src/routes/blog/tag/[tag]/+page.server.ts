import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPostsByTag, getAllPosts } from '$lib/blog';

// Convert URL slug back to original tag format
async function slugToTag(slug: string): Promise<string> {
	// First try exact match
	const allPosts = await getAllPosts();
	const allTags = new Set<string>();

	allPosts.forEach((post) => {
		if (post.tags) {
			post.tags.forEach((tag) => allTags.add(tag));
		}
	});

	// Try to find exact match first
	for (const tag of allTags) {
		if (
			tag
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '')
				.replace(/\s+/g, '-')
				.replace(/-+/g, '-')
				.trim() === slug
		) {
			return tag;
		}
	}

	// Fallback: convert slug back to readable format
	return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export const load: PageServerLoad = async ({ params }) => {
	const { tag: tagSlug } = params;

	try {
		const originalTag = await slugToTag(tagSlug);
		const posts = await getPostsByTag(originalTag);

		if (posts.length === 0) {
			throw error(404, `No posts found for tag: ${originalTag}`);
		}

		return {
			tag: originalTag,
			posts
		};
	} catch (e) {
		console.error('Error loading posts by tag:', e);
		throw error(404, `Could not find posts for tag: ${tagSlug}`);
	}
};
