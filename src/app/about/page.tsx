import type { Metadata } from "next";
import { StaticLegacyPage } from "@/components/static-legacy-page";
import { loadLegacyPage } from "@/lib/legacy-content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadLegacyPage(["about"]);
  return { title: { absolute: page.title }, description: page.description };
}

export default function AboutPage() {
  return (
    <StaticLegacyPage
      routeSegments={["about"]}
      hero={{
        title: "About",
        description:
          "We're passionate about helping you discover your unique beauty through the science of seasonal color analysis.",
        image: "/hero/hero-image-about.avif",
        tone: "light",
      }}
      transformHtml={(html) =>
        html
          .replace(
            'class="text-center bg-gray-900 text-white rounded-2xl p-12"',
            'class="text-center rounded-[2rem] border border-black/10 bg-stone-100 p-12 text-stone-950"',
          )
          .replace(
            'class="text-xl text-gray-300 mb-8"',
            'class="mb-8 text-xl text-stone-600"',
          )
          .replace(
            'class="btn btn-outline btn-lg"',
            'class="inline-flex min-h-12 items-center justify-center rounded-full border border-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-950 no-underline transition hover:bg-black hover:text-white"',
          )
          .replace(
            'class="btn btn-primary btn-lg"',
            'class="inline-flex min-h-12 items-center justify-center rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-950 no-underline transition hover:bg-black hover:text-white"',
          )
      }
    />
  );
}
