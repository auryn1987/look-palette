import type { MetadataRoute } from "next";
import { allPaletteSummaries } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lookpalette.com";
const lastModified = new Date("2026-08-28");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/palettes",
    "/privacy-policy",
    "/terms-and-conditions",
    "/tools",
    "/tools/color-picker",
    "/tools/seasonal-color-analysis",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...allPaletteSummaries.map((palette) => ({
      url: `${siteUrl}/palettes/${palette.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
