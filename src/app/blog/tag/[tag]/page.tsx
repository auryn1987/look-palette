import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTagSlug } from "@/lib/blog";
import { getPaletteTagHref } from "@/lib/site-data";
import { formatDisplayDate, startCase } from "@/lib/utils";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `${startCase(tag)} Articles`,
    description: `Articles tagged ${startCase(tag)} on Look Palette.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getPostsByTagSlug(tag);

  if (!posts.length) {
    notFound();
  }

  return (
    <div className="shell section-space">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow text-[var(--color-accent)]">Blog Tag</p>
        <h1 className="mt-3 text-4xl font-semibold">{startCase(tag)}</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          Articles related to {startCase(tag)}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="surface overflow-hidden rounded-[1.75rem]">
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
              <h2 className="mt-3 text-xl font-semibold">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 leading-7 text-stone-600">{post.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((postTag) => (
                  <Link
                    key={postTag}
                    href={getPaletteTagHref(postTag)}
                    className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700"
                  >
                    {postTag}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
