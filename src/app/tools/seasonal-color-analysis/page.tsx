import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SeasonalAnalysisTool } from "@/components/seasonal-analysis-tool";

export const metadata: Metadata = {
  title: "Seasonal Color Analysis",
  description:
    "Use Look Palette's questionnaire-based seasonal color analysis tool to discover your best palette.",
};

export default function SeasonalColorAnalysisPage() {
  return (
    <div>
      <PageHero
        title="Seasonal Color Analysis"
        description="Answer a few questions about your natural features to discover which seasonal palette fits you best."
        image="/hero/hero-image-seasonal-color.avif"
        tone="light"
      />
      <div className="shell section-space">
        <SeasonalAnalysisTool />
      </div>
    </div>
  );
}
