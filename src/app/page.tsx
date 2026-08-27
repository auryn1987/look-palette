import Link from "next/link";
import { PaletteCard } from "@/components/palette-card";
import { allPaletteSummaries } from "@/lib/site-data";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-black/10 bg-[var(--color-ink)]">
        <div className="absolute inset-0 bg-[url('/hero/hero-spring-clear.avif')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_24%),linear-gradient(120deg,rgba(0,0,0,0.72),rgba(0,0,0,0.35))]" />
        <div className="shell relative py-24 sm:py-32">
          <div className="max-w-4xl">
            <p className="eyebrow text-white/75">Seasonal Color Analysis</p>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold text-white sm:text-7xl">
              Discover the colors that make your features feel unmistakably alive.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
              Explore all twelve seasonal palettes, use the guided questionnaire,
              and build color confidence with practical tools instead of guesswork.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link className="button-primary" href="/tools/seasonal-color-analysis">
                Start Your Color Analysis
              </Link>
              <Link className="button-secondary" href="/palettes">
                Browse Seasonal Palettes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow text-[var(--color-accent)]">Palette Library</p>
          <h2 className="mt-3 text-4xl font-semibold text-stone-950">
            Explore the full twelve-season system
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            Each palette blends warmth, depth, and clarity differently. Start with
            the visual overview below, then dive into the detailed palette pages for
            skin, hair, eye, metal, gemstone, and swatch guidance.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allPaletteSummaries.map((palette) => (
            <PaletteCard key={palette.slug} palette={palette} />
          ))}
        </div>
      </section>

      <section className="shell">
        <div className="surface rounded-[2rem] px-6 py-10 sm:px-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Answer guided questions",
                description:
                  "Use the seasonal analysis questionnaire to measure your undertone, value, chroma, and contrast.",
              },
              {
                step: "02",
                title: "Read your palette results",
                description:
                  "See which season matches your answers and compare the colors that flatter you most.",
              },
              {
                step: "03",
                title: "Apply it in real life",
                description:
                  "Use the palette library and color tools when shopping, styling, or planning your wardrobe.",
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="font-display text-5xl text-[var(--color-accent)]">
                  {item.step}
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow text-[var(--color-accent)]">Tools</p>
          <h2 className="mt-3 text-4xl font-semibold">
            Useful workflows, not just inspiration
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            The new Next.js app keeps the strongest parts of the old product: a guided
            seasonal analysis flow and an image color picker for extracting swatches
            from photos, outfit screenshots, and moodboards.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            {
              href: "/tools/seasonal-color-analysis",
              image: "/images/seasonal-color-analysis-card.avif",
              title: "Seasonal Color Analysis",
              description:
                "A practical questionnaire that translates your natural features into a clear seasonal result.",
            },
            {
              href: "/tools/color-picker",
              image: "/images/color-picker-card.avif",
              title: "Image Color Picker",
              description:
                "Upload a photo, click the colors you love, and export swatches in multiple formats.",
            },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="surface group overflow-hidden rounded-[2rem]"
            >
              <div
                className="h-64 bg-cover bg-center transition duration-300 group-hover:scale-[1.01]"
                style={{ backgroundImage: `url('${tool.image}')` }}
              />
              <div className="p-8">
                <h3 className="text-2xl font-semibold">{tool.title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{tool.description}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-[var(--color-brand)]">
                  Open tool -&gt;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
