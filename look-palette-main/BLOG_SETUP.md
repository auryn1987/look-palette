# Blog System Setup

This project uses MDsveX to process Markdown files with Svelte components. The blog system is designed to be easy to manage with a CMS-like experience.

## Features

- **MDsveX Integration**: Process Markdown files with Svelte components
- **Front Matter Support**: YAML front matter for metadata
- **Responsive Grid Layout**: Blog listing similar to Liinks blog design
- **SEO Optimized**: Meta tags and structured data
- **Tag System**: Categorize posts with tags
- **Author Information**: Display author and publication date

## File Structure

```
src/routes/blog/
├── +page.svelte          # Main blog listing page
├── +page.server.ts       # Server-side logic for blog listing
├── posts/                # Directory containing blog posts
│   ├── post-1.md
│   ├── post-2.md
│   └── ...
└── [slug]/               # Dynamic route for individual posts
    ├── +page.svelte      # Individual post page component
    └── +page.server.ts   # Server-side logic for individual posts
```

## Creating a New Blog Post

1. Create a new `.md` file in `src/routes/blog/posts/`
2. Add front matter at the top of the file:

```yaml
---
layout: _blog
title: 'Your Post Title'
description: 'A brief description of your post'
date: '2024-01-15'
author: 'Author Name'
tags: ['Tag1', 'Tag2', 'Tag3']
image: '/path/to/image.avif'
---
```

3. Write your content in Markdown below the front matter
4. Use the slug from the filename as the URL (e.g., `my-post.md` becomes `/blog/my-post`)

## Front Matter Fields

- **layout**: Must be `_blog` to use the blog layout
- **title**: The post title (used in meta tags and display)
- **description**: Brief description for meta tags and previews
- **date**: Publication date in YYYY-MM-DD format
- **author**: Author name
- **tags**: Array of tags for categorization
- **image**: Featured image path (optional)

## Using Svelte Components in Posts

You can use Svelte components directly in your Markdown files:

```markdown
---
layout: _blog
title: 'My Post'
description: 'Description'
date: '2024-01-15'
author: 'Author'
tags: ['Tag']
---

# My Post Content

Regular markdown content here.

<script>
  import MyComponent from '$lib/components/MyComponent.svelte';
</script>

<MyComponent />

More markdown content...
```

## Recommended VS Code Extensions

- **Front Matter**: Provides a CMS-like interface for managing front matter
- **Markdown All in One**: Enhanced Markdown support
- **Svelte for VS Code**: Svelte syntax highlighting and IntelliSense

## Styling

The blog uses custom typography styles defined in `src/app.css`. The `.prose` class provides consistent styling for Markdown content.

## Adding Images

Store blog images in the `static/` directory and reference them in your posts:

```markdown
![Alt text](/path/to/image.avif)
```

## SEO Features

- Automatic meta tags from front matter
- Open Graph tags for social sharing
- Twitter Card support
- Structured data for better search engine understanding

## Customization

- Modify `src/lib/layouts/BlogPost.svelte` to change the post layout
- Update `src/routes/blog/+page.svelte` to change the listing page design
- Add new fields to front matter and update the layout component accordingly
