import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PaletteCard } from "@/components/palette-card";
import { heroSeasonalPalettes } from "@/lib/data/heroSeasonalPalettes";

export const metadata: Metadata = {
  title: "Seasonal Color Palettes",
  description:
    "Explore the full Look Palette library of Spring, Summer, Autumn, and Winter seasonal color palettes.",
};

export default function PalettesPage() {
  return (
    <div>
      <PageHero
        title="Seasonal Color Palettes"
        description="The twelve-season system adds precision to classic color analysis by pairing warmth, depth, and clarity into more useful palette families."
        image="/hero/hero-image-palettes.avif"
        tone="light"
      />
      <div className="shell section-space space-y-16">
        {heroSeasonalPalettes.map((season) => (
          <section key={season.key}>
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow text-[var(--color-accent)]">{season.name}</p>
              <h2 className="mt-3 text-4xl font-semibold">{season.name} Palettes</h2>
              <p className="mt-4 text-lg leading-8 text-stone-600">
                {season.description}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {season.subtypes.map((palette) => (
                <PaletteCard
                  key={palette.slug}
                  palette={{
                    ...palette,
                    baseSeason: season.name,
                    seasonDescription: season.description,
                  }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
