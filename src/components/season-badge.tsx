import { cn } from "@/lib/utils";

const seasonColors = {
  Spring: "bg-amber-100 text-amber-900 border-amber-300",
  Summer: "bg-sky-100 text-sky-900 border-sky-300",
  Autumn: "bg-orange-100 text-orange-900 border-orange-300",
  Winter: "bg-slate-100 text-slate-900 border-slate-300",
};

export function SeasonBadge({ season }: { season: string }) {
  const baseSeason = season.includes("Spring")
    ? "Spring"
    : season.includes("Summer")
      ? "Summer"
      : season.includes("Autumn")
        ? "Autumn"
        : "Winter";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-sm font-semibold",
        seasonColors[baseSeason],
      )}
    >
      {season}
    </span>
  );
}
