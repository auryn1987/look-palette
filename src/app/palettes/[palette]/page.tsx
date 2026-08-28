import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PaletteSizeGrid } from "@/components/palette-size-grid";
import { allPaletteSummaries, getPaletteDetail } from "@/lib/site-data";
import { startCase } from "@/lib/utils";

const lightTextPaletteNames = new Set([
  "Deep Winter",
  "Clear Winter",
  "Warm Autumn",
  "Warm Spring",
  "Cool Summer",
  "Cool Winter",
]);

export async function generateStaticParams() {
  return allPaletteSummaries.map((palette) => ({ palette: palette.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ palette: string }>;
}): Promise<Metadata> {
  const { palette } = await params;
  const detail = getPaletteDetail(palette);

  if (!detail) {
    return {};
  }

  return {
    title: { absolute: detail.metaTitle },
    description: detail.metaDescription,
  };
}

function ResourceGrid({
  title,
  description,
  folder,
  items,
}: {
  title: string;
  description: string;
  folder: string;
  items: string[];
}) {
  const desktopColumns = items.length >= 6 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section className="surface rounded-[2rem] p-6 sm:p-8">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-3 leading-7 text-stone-600">{description}</p>
      <div className={`mt-6 grid gap-4 sm:grid-cols-2 ${desktopColumns}`}>
        {items.map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-[1.5rem] border border-black/8 bg-white"
          >
            <div className="relative aspect-square">
              <Image
                src={`/${folder}/${item}.avif`}
                alt={startCase(item)}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="px-4 py-3 text-center text-sm font-medium text-stone-700">
              {startCase(item)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SwatchSection({
  title,
  colors,
}: {
  title: string;
  colors: string[];
}) {
  return (
    <section className="surface rounded-[2rem] p-6 sm:p-8">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {colors.map((color) => (
          <div key={color} className="space-y-2">
            <div
              className="h-24 rounded-[1.25rem] border border-black/10"
              style={{ backgroundColor: color }}
            />
            <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
              {color}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function PaletteDetailPage({
  params,
}: {
  params: Promise<{ palette: string }>;
}) {
  const { palette } = await params;
  const detail = getPaletteDetail(palette);

  if (!detail) {
    notFound();
  }

  const useLightHeaderText = lightTextPaletteNames.has(detail.name);

  return (
    <div>
      <header className="relative overflow-hidden border-b border-black/10 bg-stone-950">
        <div className="absolute inset-0">
          <Image
            src={detail.image}
            alt={detail.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className={
              useLightHeaderText
                ? "absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15"
                : "absolute inset-0 bg-gradient-to-r from-white/72 via-white/44 to-white/16"
            }
          />
        </div>
        <div className="shell relative py-20 sm:py-24">
          <div className="max-w-6xl">
            <h1
              className={`max-w-5xl text-balance text-5xl font-semibold sm:text-6xl ${
                useLightHeaderText ? "text-white" : "text-black"
              }`}
            >
              {detail.name}
            </h1>
            <p
              className={`mt-4 max-w-4xl text-xl ${
                useLightHeaderText ? "text-white" : "text-black"
              }`}
            >
              {detail.subtitle}
            </p>
            <p
              className={`mt-5 max-w-5xl text-lg leading-8 ${
                useLightHeaderText ? "text-white/75" : "text-black/75"
              }`}
            >
              {detail.description}
            </p>
          </div>
        </div>
      </header>

      <div className="shell section-space space-y-8">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface rounded-[2rem] p-6 sm:p-8">
            <p className="eyebrow text-[var(--color-accent)]">{detail.season}</p>
            <h2 className="mt-2 text-2xl font-semibold">Palette Description</h2>
            <p className="mt-4 leading-8 text-stone-600">{detail.description}</p>
          </div>
          <div className="surface rounded-[2rem] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Skin Range</h2>
            <p className="mt-4 leading-8 text-stone-600">{detail.skinDescription}</p>
            <div className="mt-6 grid grid-cols-5 gap-2">
              {detail.skin.map((color) => (
                <div
                  key={color}
                  className="aspect-square rounded-2xl border border-black/8"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </section>

        <ResourceGrid
          title="Hair"
          description={detail.hairDescription}
          folder="hair"
          items={detail.hair}
        />
        <ResourceGrid
          title="Eyes"
          description={detail.eyesDescription}
          folder="eyes"
          items={detail.eyes}
        />
        <ResourceGrid
          title="Metals"
          description={detail.metalDescription}
          folder="metal"
          items={detail.metal}
        />
        <ResourceGrid
          title="Gemstones"
          description={
            detail.gemstonesDescription || "Recommended gemstones for this palette."
          }
          folder="gemstones"
          items={detail.gemstones}
        />

        <PaletteSizeGrid paletteName={detail.name} />
        <SwatchSection title="Best Colors" colors={detail.bestColors} />
        <SwatchSection title="Best Neutrals" colors={detail.bestNeutrals} />
        <SwatchSection title="Worst Colors" colors={detail.worstColors} />
      </div>
    </div>
  );
}
