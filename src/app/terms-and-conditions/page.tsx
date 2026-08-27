import type { Metadata } from "next";
import { StaticLegacyPage } from "@/components/static-legacy-page";
import { loadLegacyPage } from "@/lib/legacy-content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadLegacyPage(["terms-and-conditions"]);
  return { title: { absolute: page.title }, description: page.description };
}

export default function TermsPage() {
  return <StaticLegacyPage routeSegments={["terms-and-conditions"]} />;
}
