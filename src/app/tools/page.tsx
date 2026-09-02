import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Tools",
  description: "Explore Look Palette's early access page and live image color picker.",
};

export default function ToolsPage() {
  return (
    <div>
      <PageHero
        title="Tools"
        description="Join early access for seasonal color analysis or use the live image color picker today."
        image="/hero/hero-image-tools.avif"
      />
      <div className="shell section-space space-y-16">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-8 text-stone-600">
            The launch site now focuses on one future product and one live utility:
            early access for personalized seasonal color analysis, plus a public image
            color picker people can use right away.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {[
            {
              href: "/tools/seasonal-color-analysis",
              image: "/images/seasonal-color-analysis-card.avif",
              title: "Seasonal Color Analysis Early Access",
              bullets: [
                "Join the waitlist",
                "See what the product is becoming",
                "Get notified when access opens",
              ],
              buttonLabel: "Join Early Access",
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
              buttonLabel: "Open Tool",
            },
          ].map((tool) => (
            <div key={tool.href} className="surface overflow-hidden rounded-4xl">
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
                  {tool.buttonLabel}
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
