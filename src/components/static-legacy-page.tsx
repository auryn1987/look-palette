import { loadLegacyPage } from "@/lib/legacy-content";

export async function StaticLegacyPage({
  routeSegments,
}: {
  routeSegments: string[];
}) {
  const page = await loadLegacyPage(routeSegments);

  return (
    <div className="shell section-space">
      <div
        className="legacy-content surface rounded-[2rem] p-6 sm:p-10"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </div>
  );
}
