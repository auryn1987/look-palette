import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { loadBlogPost } from '$lib/blog';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	try {
		const result = await loadBlogPost(slug);

		return {
			content: result.content,
			metadata: result.metadata
		};
	} catch (e) {
		console.error('Error loading blog post:', e);
		console.error('Slug:', slug);
		console.error('Error details:', (e as Error).message);
		throw error(404, `Could not find ${slug}`);
	}
};
