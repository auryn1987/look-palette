import type { Metadata } from "next";
import { StaticLegacyPage } from "@/components/static-legacy-page";
import { loadLegacyPage } from "@/lib/legacy-content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadLegacyPage(["privacy-policy"]);
  return { title: { absolute: page.title }, description: page.description };
}

export default function PrivacyPolicyPage() {
  return <StaticLegacyPage routeSegments={["privacy-policy"]} />;
}
