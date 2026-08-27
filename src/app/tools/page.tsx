import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Tools",
  description: "Explore Look Palette tools for color analysis and palette discovery.",
};

export default function ToolsPage() {
  return (
    <div>
      <PageHero
        title="Tools"
        description="Discover your palette, extract swatches from images, and explore new ways to work with color."
        image="/hero/hero-image-tools.avif"
      />
      <div className="shell section-space space-y-16">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-8 text-stone-600">
            The original Svelte project centered around practical tools, so the Next.js
            rebuild keeps that same focus: a guided seasonal analysis flow and an image
            color picker that helps turn inspiration into usable palettes.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {[
            {
              href: "/tools/seasonal-color-analysis",
              image: "/images/seasonal-color-analysis-card.avif",
              title: "Seasonal Color Analysis",
              bullets: [
                "Comprehensive questionnaire",
                "Ranked characteristic results",
                "Direct links to matching palettes",
              ],
            },
            {
              href: "/tools/color-picker",
              image: "/images/color-picker-card.avif",
              title: "Image Color Picker",
              bullets: [
                "Upload any image",
                "Click to sample exact colors",
                "Export swatches in multiple formats",
              ],
            },
          ].map((tool) => (
            <div key={tool.href} className="surface overflow-hidden rounded-[2rem]">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url('${tool.image}')` }}
              />
              <div className="p-8">
                <h2 className="text-2xl font-semibold">{tool.title}</h2>
                <ul className="mt-5 space-y-3 text-stone-600">
                  {tool.bullets.map((bullet) => (
                    <li key={bullet}>- {bullet}</li>
                  ))}
                </ul>
                <Link className="button-primary mt-6 w-full" href={tool.href}>
                  Open Tool
                </Link>
              </div>
            </div>
          ))}
        </section>

        <section className="surface rounded-[2rem] p-8 text-center sm:p-12">
          <p className="eyebrow text-[var(--color-accent)]">Next Up</p>
          <h2 className="mt-3 text-3xl font-semibold">More tools are on the roadmap</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-stone-600">
            The style-analysis route from the original project is preserved in this
            migration as a placeholder while the richer backend-backed workflows are
            redesigned.
          </p>
        </section>
      </div>
    </div>
  );
}
