import seasonalQuestionnaire from "@/lib/data/SeasonalAnalysis.json";
import { tagToSlug } from "@/lib/data/functions";
import { heroSeasonalPalettes } from "@/lib/data/heroSeasonalPalettes";
import { paletteDetails } from "@/lib/data/paletteDetails";
import {
  palettesHex16,
  palettesHex24,
  palettesHex32,
  palettesHex40,
  palettesHex48,
  palettesHex56,
  palettesHex64,
} from "@/lib/data/palettes";

export const paletteSizes = [16, 24, 32, 40, 48, 56, 64] as const;

const paletteCollections = {
  16: palettesHex16,
  24: palettesHex24,
  32: palettesHex32,
  40: palettesHex40,
  48: palettesHex48,
  56: palettesHex56,
  64: palettesHex64,
} as const;

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/palettes", label: "Palettes" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerGroups = [
  {
    title: "Explore",
    links: navigationLinks,
  },
  {
    title: "Popular Tools",
    links: [
      { href: "/tools/seasonal-color-analysis", label: "Seasonal Color Analysis" },
      { href: "/tools/color-picker", label: "Image Color Picker" },
      { href: "/tools/seasonal-style-analysis", label: "Seasonal Style Analysis" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/pricing", label: "Pricing" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
    ],
  },
] as const;

export const socialLinks = [
  {
    href: "https://www.facebook.com/lookpalette",
    icon: "/social/facebook.svg",
    label: "Facebook",
    size: 20,
  },
  {
    href: "https://www.instagram.com/look.palette/",
    icon: "/social/instagram.svg",
    label: "Instagram",
    size: 24,
  },
  {
    href: "https://x.com/lookpalettecom",
    icon: "/social/twitter.svg",
    label: "Twitter",
    size: 16,
  },
  {
    href: "https://bsky.app/profile/lookpalette.bsky.social",
    icon: "/social/bluesky.svg",
    label: "Bluesky",
    size: 16,
  },
  {
    href: "https://www.threads.com/@look.palette",
    icon: "/social/threads.svg",
    label: "Threads",
    size: 16,
  },
  {
    href: "https://www.youtube.com/@lookpalette",
    icon: "/social/youtube.svg",
    label: "YouTube",
    size: 20,
  },
  {
    href: "https://www.tiktok.com/@look.palette",
    icon: "/social/tiktok.svg",
    label: "TikTok",
    size: 20,
  },
] as const;

export const allPaletteSummaries = heroSeasonalPalettes.flatMap((season) =>
  season.subtypes.map((subtype) => ({
    ...subtype,
    baseSeason: season.name,
    seasonDescription: season.description,
  })),
);

export type PaletteSummary = (typeof allPaletteSummaries)[number];
export type PaletteDetail = (typeof paletteDetails)[keyof typeof paletteDetails];
export type PaletteSize = (typeof paletteSizes)[number];

export function getPaletteSummary(slug: string) {
  return allPaletteSummaries.find((palette) => palette.slug === slug);
}

export function getPaletteDetail(slug: string) {
  return paletteDetails[slug as keyof typeof paletteDetails];
}

export function getPaletteColors(paletteName: string, size: PaletteSize) {
  const collection = paletteCollections[size];

  for (const season of Object.values(collection)) {
    const match = season.find(
      (palette) =>
        palette.name.toLowerCase().replace(/\s+/g, "-") ===
        paletteName.toLowerCase().replace(/\s+/g, "-"),
    );

    if (match) {
      return match.colors;
    }
  }

  return [];
}

export function getPaletteTagHref(tag: string) {
  return `/blog/tag/${tagToSlug(tag)}`;
}

export function getPaletteQuestionnaire() {
  return seasonalQuestionnaire;
}
