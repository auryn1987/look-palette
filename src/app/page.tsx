import Link from "next/link";
import { MarketingHero } from "@/components/marketing-hero";
import { PaletteCard } from "@/components/palette-card";
import { allPaletteSummaries } from "@/lib/site-data";

export default function HomePage() {
  return (
    <div>
      <MarketingHero
        source="home-hero"
        image="/hero/hero-spring-clear.avif"
        title="Discover the colors that look best on you"
        description="Find your seasonal color palette and learn which colors to wear, buy, and build your wardrobe around."
      />

      <section className="shell section-space">
        <div className="surface mb-12 rounded-4xl px-6 py-10 sm:px-10">
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
                <p className="font-display text-5xl text-accent">
                  {item.step}
                </p>
                <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
                <p className="mt-3 leading-7 text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 max-w-3xl">
          <p className="eyebrow text-accent">Palette Library</p>
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
          <p className="eyebrow text-accent">Free Tool</p>
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
          className="surface group block overflow-hidden rounded-4xl"
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
