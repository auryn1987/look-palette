import { readFile } from "fs/promises";
import path from "path";

const routesRoot = path.join(process.cwd(), "look-palette-main", "src", "routes");

export interface LegacyPage {
  title: string;
  description: string;
  html: string;
}

export async function loadLegacyPage(routeSegments: string[]): Promise<LegacyPage> {
  const filePath = path.join(routesRoot, ...routeSegments, "+page.svelte");
  const source = await readFile(filePath, "utf8");

  const title =
    source.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? "Look Palette";
  const description =
    source
      .match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/)?.[1]
      ?.trim() ?? "Look Palette";

  const html = source
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<svelte:head>[\s\S]*?<\/svelte:head>/g, "")
    .trim();

  return { title, description, html };
}
