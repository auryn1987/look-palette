import { readdir, readFile } from "fs/promises";
import path from "path";
import { tagToSlug } from "@/lib/data/functions";
import { escapeHtml } from "@/lib/utils";

const blogRoot = path.join(
  process.cwd(),
  "look-palette-main",
  "src",
  "routes",
  "blog",
);

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  content: string;
  contentHtml: string;
}

interface Frontmatter {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
  image?: string;
}

function stripQuotes(value: string) {
  return value.replace(/^['"]|['"]$/g, "");
}

function parseFrontmatter(frontmatter: string): Frontmatter {
  const result: Frontmatter = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    if (!line.trim()) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      result[key as keyof Frontmatter] = rawValue
        .slice(1, -1)
        .split(",")
        .map((item) => stripQuotes(item.trim()))
        .filter(Boolean) as never;
      continue;
    }

    result[key as keyof Frontmatter] = stripQuotes(rawValue) as never;
  }

  return result;
}

function extractPostParts(source: string) {
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---\n?/);
  const frontmatter = frontmatterMatch ? parseFrontmatter(frontmatterMatch[1]) : {};
  const rawBody = frontmatterMatch ? source.slice(frontmatterMatch[0].length) : source;

  const content = rawBody
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<\/?BlogLayout[^>]*>/g, "")
    .trim();

  return { frontmatter, content };
}

function renderInline(markdown: string) {
  return escapeHtml(markdown).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderMarkdownToHtml(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushParagraph = () => {
    if (!paragraph.length) {
      return;
    }

    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType || !listItems.length) {
      return;
    }

    html.push(
      `<${listType}>${listItems
        .map((item) => `<li>${renderInline(item)}</li>`)
        .join("")}</${listType}>`,
    );
    listItems = [];
    listType = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      html.push(`<h2>${renderInline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      html.push(`<h3>${renderInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(orderedMatch[1]);
      continue;
    }

    const unorderedMatch = trimmed.match(/^-+\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(unorderedMatch[1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return html.join("");
}

async function readPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogRoot, slug, "+page.svx");

  try {
    const source = await readFile(filePath, "utf8");
    const { frontmatter, content } = extractPostParts(source);

    return {
      slug,
      title: frontmatter.title ?? "Untitled",
      description: frontmatter.description ?? "",
      date: frontmatter.date ?? "2024-01-01",
      author: frontmatter.author ?? "Look Palette Team",
      tags: frontmatter.tags ?? [],
      image: frontmatter.image ?? "/hero/hero-image-blog.avif",
      content,
      contentHtml: renderMarkdownToHtml(content),
    };
  } catch {
    return null;
  }
}

export async function getAllPosts() {
  const entries = await readdir(blogRoot, { withFileTypes: true });
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => readPost(entry.name)),
  );

  return posts
    .filter((post): post is BlogPost => Boolean(post))
    .sort((left, right) => right.date.localeCompare(left.date));
}

export async function getPostBySlug(slug: string) {
  return readPost(slug);
}

export async function getAllTags() {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export async function getPostsByTagSlug(tagSlug: string) {
  const posts = await getAllPosts();
  return posts.filter((post) =>
    post.tags.some((tag) => tagToSlug(tag) === tagSlug),
  );
}
