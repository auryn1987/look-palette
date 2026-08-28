import Link from "next/link";
import { EarlyAccessForm } from "@/components/early-access-form";
import { PaletteCard } from "@/components/palette-card";
import { allPaletteSummaries } from "@/lib/site-data";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-black/10 bg-[var(--color-paper)]">
        <div className="absolute inset-0 bg-[url('/hero/hero-spring-clear.avif')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-white/28" />
        <div className="shell relative py-24 sm:py-32">
          <div className="max-w-4xl rounded-[2rem] bg-[rgba(255,253,249,0.78)] p-8 shadow-[0_24px_60px_rgba(51,38,22,0.1)] backdrop-blur-sm sm:p-10">
            <h1 className="max-w-3xl text-balance text-5xl font-semibold text-stone-950 sm:text-7xl">
              Discover the colors that look best on you
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700 sm:text-xl">
              Find your seasonal color palette and learn which colors complement
              you - from what to wear to what to shop.
            </p>
            <p className="mt-6 text-base font-semibold uppercase tracking-[0.16em] text-stone-950">
              Free seasonal color analysis. Coming soon.
            </p>
            <div className="mt-10 max-w-2xl rounded-[1.5rem] bg-white p-5">
              <EarlyAccessForm
                source="home-hero"
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
        <div className="surface mb-12 rounded-[2rem] px-6 py-10 sm:px-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Join early access",
                description:
                  "Enter your email to be among the first to try Look Palette's free seasonal color analysis.",
              },
              {
                step: "02",
                title: "Discover your best colors",
                description:
                  "When Look Palette launches, upload a photo to discover your seasonal palette and the colors that complement you.",
              },
              {
                step: "03",
                title: "Shop your palette",
                description:
                  "Explore clothing recommendations selected to match your seasonal colors and make shopping easier.",
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="font-display text-5xl text-[var(--color-accent)]">
                  {item.step}
                </p>
                <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
                <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

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

      <section className="shell section-space">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow text-[var(--color-accent)]">Free Tool</p>
          <h2 className="mt-3 text-4xl font-semibold">
            Use the image color picker today
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            While the personalized analysis experience is still in early access, the
            image color picker is already live and useful for pulling swatches from
            outfits, screenshots, moodboards, and inspiration images.
          </p>
        </div>
        <Link
          href="/tools/color-picker"
          className="surface group block overflow-hidden rounded-[2rem]"
        >
          <div
            className="h-72 bg-cover bg-center transition duration-300 group-hover:scale-[1.01]"
            style={{ backgroundImage: "url('/images/color-picker-card.avif')" }}
          />
          <div className="p-8">
            <h3 className="text-2xl font-semibold">Image Color Picker</h3>
            <p className="mt-3 max-w-3xl leading-7 text-stone-600">
              Upload a photo, click the colors you love, and export swatches in
              multiple formats.
            </p>
            <span className="mt-5 inline-flex text-sm font-semibold text-black">
              Open tool -&gt;
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}
