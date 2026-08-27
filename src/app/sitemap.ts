import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { allPaletteSummaries } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lookpalette.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/faq",
    "/palettes",
    "/pricing",
    "/privacy-policy",
    "/terms-and-conditions",
    "/tools",
    "/tools/color-picker",
    "/tools/seasonal-color-analysis",
    "/tools/seasonal-style-analysis",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date("2026-08-27"),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...allPaletteSummaries.map((palette) => ({
      url: `${siteUrl}/palettes/${palette.slug}`,
      lastModified: new Date("2026-08-27"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
