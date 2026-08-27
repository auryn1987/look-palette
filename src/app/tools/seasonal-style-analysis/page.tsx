import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/coming-soon-panel";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Seasonal Style Analysis",
  description:
    "Analyze clothing items and understand which seasonal palette they align with.",
};

export default function SeasonalStyleAnalysisPage() {
  return (
    <div>
      <PageHero
        title="Seasonal Style Analysis"
        description="This route from the original project is preserved while the new backend-backed experience is redesigned."
        image="/hero/hero-image-seasonal-style.avif"
        tone="light"
      />
      <ComingSoonPanel
        title="Seasonal style analysis is being rebuilt"
        description="The old Svelte project left this workflow mostly empty. The new Next.js version keeps the route in place while the richer item-analysis experience is scoped out."
      />
    </div>
  );
}
