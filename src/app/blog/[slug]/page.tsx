import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDisplayDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="shell section-space">
      <div className="surface overflow-hidden rounded-[2rem]">
        <div className="relative aspect-[1.9/1]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mx-auto max-w-4xl p-6 sm:p-10">
          <p className="eyebrow text-[var(--color-accent)]">Look Palette Blog</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-stone-500">
            {post.author} · {formatDisplayDate(post.date)}
          </p>
          <p className="mt-6 text-lg leading-8 text-stone-600">{post.description}</p>
          <div
            className="prose-content mt-10"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </div>
    </article>
  );
}
