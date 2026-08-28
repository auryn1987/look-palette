import { loadLegacyPage } from "@/lib/legacy-content";
import { PageHero } from "@/components/page-hero";

interface StaticLegacyPageProps {
  routeSegments: string[];
  hero?: {
    title: string;
    description: string;
    image: string;
    tone?: "light" | "dark";
  };
  transformHtml?: (html: string) => string;
}

export async function StaticLegacyPage({
  routeSegments,
  hero,
  transformHtml,
}: StaticLegacyPageProps) {
  const page = await loadLegacyPage(routeSegments);
  const html = (transformHtml ?? ((value) => value))(
    hero ? page.html.replace(/^<header[\s\S]*?<\/header>\s*/i, "") : page.html,
  );

  return (
    <div>
      {hero ? (
        <PageHero
          title={hero.title}
          description={hero.description}
          image={hero.image}
          tone={hero.tone}
        />
      ) : null}
      <div className="shell section-space">
        <div
          className="legacy-content surface rounded-[2rem] p-6 sm:p-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
