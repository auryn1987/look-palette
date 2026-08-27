import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getAllPosts } from "@/lib/blog";
import { getPaletteTagHref } from "@/lib/site-data";
import { formatDisplayDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles from Look Palette about seasonal color analysis, styling, and practical color decisions.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <div>
      <PageHero
        title="Blog"
        description="Articles about seasonal color analysis and how to apply it in real wardrobes, styling choices, and shopping decisions."
        image="/hero/hero-image-blog.avif"
        tone="light"
      />

      <div className="shell section-space space-y-16">
        {featuredPost ? (
          <section>
            <div className="mb-8">
              <p className="eyebrow text-[var(--color-accent)]">Featured Article</p>
              <h2 className="mt-2 text-3xl font-semibold">Start Here</h2>
            </div>
            <article className="surface overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[1.9/1]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <p className="text-sm text-stone-500">
                  {featuredPost.author} · {formatDisplayDate(featuredPost.date)}
                </p>
                <h3 className="mt-3 text-3xl font-semibold">
                  <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h3>
                <p className="mt-4 max-w-3xl leading-8 text-stone-600">
                  {featuredPost.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={getPaletteTagHref(tag)}
                      className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </section>
        ) : null}

        <section>
          <div className="mb-8">
            <p className="eyebrow text-[var(--color-accent)]">All Articles</p>
            <h2 className="mt-2 text-3xl font-semibold">More Reading</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post) => (
              <article
                key={post.slug}
                className="surface overflow-hidden rounded-[1.75rem]"
              >
                <div className="relative aspect-[1.9/1]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-stone-500">
                    {post.author} · {formatDisplayDate(post.date)}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 leading-7 text-stone-600">{post.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={getPaletteTagHref(tag)}
                        className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
