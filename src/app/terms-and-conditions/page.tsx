import type { Metadata } from "next";
import { StaticLegacyPage } from "@/components/static-legacy-page";
import { loadLegacyPage } from "@/lib/legacy-content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadLegacyPage(["terms-and-conditions"]);
  return { title: { absolute: page.title }, description: page.description };
}

export default function TermsPage() {
  return (
    <StaticLegacyPage
      routeSegments={["terms-and-conditions"]}
      hero={{
        title: "Terms & Conditions",
        description: "Review the terms and conditions for using Look Palette.",
        image: "/hero/hero-image-terms-and-conditions.avif",
        tone: "light",
      }}
    />
  );
}
