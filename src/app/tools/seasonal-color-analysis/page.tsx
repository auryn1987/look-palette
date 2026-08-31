import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EarlyAccessForm } from "@/components/early-access-form";
import { heroSeasonalPalettes } from "@/lib/data/heroSeasonalPalettes";

const steps = [
  {
    step: "01",
    title: "Add your photos",
    description:
      "Follow simple guidance to provide photos that help us understand your natural coloring.",
  },
  {
    step: "02",
    title: "Discover your season",
    description:
      "Find where you fit across the 12 seasonal color palettes, from Soft Summer to Deep Autumn.",
  },
  {
    step: "03",
    title: "Explore your best colors",
    description:
      "Get a personal palette and understand the warm vs. cool, light vs. deep, and bright vs. muted characteristics behind your result.",
  },
] as const;

const productPreviews = [
  {
    name: "Soft camel knit",
    palette: "Warm Autumn",
    note: "Easy everyday neutrals chosen to work with rich, golden coloring.",
    colors: ["#eadcbe", "#d8997a", "#d6bc94"],
  },
  {
    name: "Berry wrap dress",
    palette: "Cool Summer",
    note: "Muted cool tones that feel polished without overpowering soft contrast.",
    colors: ["#e8a2b4", "#904c90", "#99bee3"],
  },
  {
    name: "Forest overshirt",
    palette: "Deep Autumn",
    note: "Deeper shades that echo earthy warmth and stronger natural contrast.",
    colors: ["#7b1313", "#9e7200", "#007da1"],
  },
  {
    name: "Clear blue blouse",
    palette: "Clear Spring",
    note: "Bright, fresh color picks designed to keep clear coloring looking lively.",
    colors: ["#fccd63", "#019cd9", "#ea2282"],
  },
] as const;

export const metadata: Metadata = {
  title: "Free Seasonal Color Analysis",
  description:
    "Join early access for Look Palette's free seasonal color analysis and discover the colors that complement you best.",
};

export default function SeasonalColorAnalysisPage() {
  return (
    <div>
      <section
        id="early-access"
        className="relative overflow-hidden border-b border-black/10 bg-[var(--color-paper)]"
      >
        <div className="absolute inset-0">
          <Image
            src="/hero/hero-image-seasonal-color.avif"
            alt="Free seasonal color analysis"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/28" />
        </div>
        <div className="shell relative py-24 sm:py-32">
          <div className="max-w-4xl rounded-[2rem] bg-[rgba(255,253,249,0.78)] p-8 shadow-[0_24px_60px_rgba(51,38,22,0.1)] backdrop-blur-sm sm:p-10">
            <p className="eyebrow text-stone-950">Look Palette</p>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold text-stone-950 sm:text-7xl">
              Discover the colors that look best on you
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700 sm:text-xl">
              Join early access to Look Palette&apos;s free seasonal color analysis.
              Discover your season, explore your personal palette, and learn which
              colors complement you.
            </p>
            <p className="mt-6 text-base font-semibold uppercase tracking-[0.16em] text-stone-950">
              Free seasonal color analysis. Coming soon.
            </p>
            <div className="mt-10 max-w-2xl rounded-[1.5rem] bg-white p-5">
              <EarlyAccessForm
                source="seasonal-analysis-hero"
                buttonLabel="Join Waitlist"
                placeholder="Email address"
                theme="light"
              />
              <p className="mt-3 text-sm text-stone-600">
                Join the early access list and be among the first to discover
                your palette.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <div className="surface rounded-[2rem] px-6 py-10 sm:px-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-[var(--color-accent)]">How It Works</p>
            <h2 className="mt-3 text-4xl font-semibold text-stone-950">
              Your personal palette, made simple
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone-600">
              Seasonal color analysis looks at the relationship between your natural
              coloring and different colors to help identify the palette that
              complements you best.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.75rem] border border-black/10 bg-white p-6"
              >
                <p className="font-display text-5xl text-[var(--color-accent)]">
                  {item.step}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-stone-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space pt-0">
        <div className="surface rounded-[2rem] px-6 py-10 sm:px-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-[var(--color-accent)]">Coming Soon</p>
            <h2 className="mt-3 text-4xl font-semibold text-stone-950">
              Know your colors. Shop with confidence.
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone-600">
              We&apos;re building Look Palette to go beyond discovering your
              season. You&apos;ll be able to explore clothing selected to complement
              your palette, making it easier to find colors that work for you.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {productPreviews.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white"
              >
                <div className="flex h-44 items-end bg-[linear-gradient(160deg,#f8f3ea,#ede3d5)] p-5">
                  <div className="w-full rounded-[1.25rem] border border-black/10 bg-white/85 p-4 backdrop-blur">
                    <p className="eyebrow text-[var(--color-accent)]">Preview</p>
                    <h3 className="mt-2 text-xl font-semibold text-stone-950">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-stone-600">
                      Best for {item.palette}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  {item.colors.map((color) => (
                    <div
                      key={color}
                      className="h-4"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="p-5">
                  <p className="text-sm leading-7 text-stone-600">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space pt-0">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow text-[var(--color-accent)]">Palette Library</p>
          <h2 className="mt-3 text-4xl font-semibold text-stone-950">
            Explore the 12 seasons
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            Not ready to wait? Explore our seasonal color guides to learn about
            each palette, its defining characteristics, and the colors associated
            with it.
          </p>
        </div>
        <div className="space-y-8">
          {heroSeasonalPalettes.map((season) => (
            <section key={season.key}>
              <div className="mb-4">
                <p className="eyebrow text-[var(--color-accent)]">{season.name}</p>
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                {season.subtypes.map((palette) => (
                  <Link
                    key={palette.slug}
                    href={`/palettes/${palette.slug}`}
                    className="surface group overflow-hidden rounded-[1.75rem] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(51,38,22,0.12)]"
                  >
                    <div className="relative aspect-[4/4.6] overflow-hidden">
                      <Image
                        src={palette.image}
                        alt={palette.name}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="grid grid-cols-5">
                      {palette.bestColors.slice(0, 5).map((color) => (
                        <div
                          key={color}
                          className="h-4"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="p-5">
                      <p className="eyebrow text-[var(--color-accent)]">
                        {season.name}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-stone-950">
                        {palette.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-stone-600">
                        {palette.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="shell section-space pt-0">
        <div className="overflow-hidden rounded-[2rem] bg-[var(--color-ink)] px-6 py-10 text-white sm:px-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-white/72">Early Access</p>
            <h2 className="mt-3 text-4xl font-semibold">Find your palette</h2>
            <p className="mt-4 text-lg leading-8 text-white/78">
              Join Look Palette early access and be among the first to try our free
              personalized seasonal color analysis.
            </p>
          </div>
          <div className="mt-8 max-w-2xl">
            <EarlyAccessForm
              source="seasonal-analysis-footer"
              buttonLabel="Get Early Access"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
