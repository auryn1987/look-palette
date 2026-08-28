import Image from "next/image";
import Link from "next/link";
import type { PaletteSummary } from "@/lib/site-data";

export function PaletteCard({ palette }: { palette: PaletteSummary }) {
  return (
    <Link
      className="surface group block overflow-hidden rounded-[1.75rem] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(51,38,22,0.12)]"
      href={`/palettes/${palette.slug}`}
      aria-label={`View ${palette.name} palette`}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={palette.image}
          alt={palette.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="grid grid-cols-10">
        {palette.bestColors.map((color) => (
          <div
            key={color}
            className="aspect-square"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="p-6">
        <p className="eyebrow text-[var(--color-accent)]">{palette.baseSeason}</p>
        <h3 className="mt-2 text-2xl font-semibold text-stone-950">{palette.name}</h3>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          {palette.shortDescription}
        </p>
        <p className="mt-5 text-sm font-semibold text-stone-950">View Palette -&gt;</p>
      </div>
    </Link>
  );
}
