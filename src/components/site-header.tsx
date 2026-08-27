import Link from "next/link";
import { allPaletteSummaries, navigationLinks } from "@/lib/site-data";

const paletteGroups = [
  {
    title: "Spring",
    items: allPaletteSummaries.filter((palette) => palette.baseSeason === "Spring"),
  },
  {
    title: "Summer",
    items: allPaletteSummaries.filter((palette) => palette.baseSeason === "Summer"),
  },
  {
    title: "Autumn",
    items: allPaletteSummaries.filter((palette) => palette.baseSeason === "Autumn"),
  },
  {
    title: "Winter",
    items: allPaletteSummaries.filter((palette) => palette.baseSeason === "Winter"),
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-ink)]/95 backdrop-blur">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link className="font-display text-3xl tracking-wide text-white md:text-4xl" href="/">
          LOOK PALETTE
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/85 lg:flex">
          {navigationLinks.slice(0, 4).map((link) =>
            link.label === "Palettes" ? (
              <details key={link.href} className="group relative">
                <summary className="cursor-pointer transition-opacity hover:opacity-80">
                  Palettes
                </summary>
                <div className="absolute left-1/2 top-full mt-4 grid w-[42rem] -translate-x-1/2 grid-cols-4 gap-4 rounded-[1.5rem] border border-white/10 bg-[#17120e] p-5 shadow-2xl">
                  {paletteGroups.map((group) => (
                    <div key={group.title}>
                      <p className="eyebrow text-white/55">{group.title}</p>
                      <div className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.slug}
                            className="block rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                            href={`/palettes/${item.slug}`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={link.href}
                className="transition-opacity hover:opacity-80"
                href={link.href}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link className="rounded-full px-4 py-2 text-sm font-medium text-white/85" href="/contact">
            Contact
          </Link>
          <Link className="button-primary !bg-[var(--color-accent)]" href="/tools/seasonal-color-analysis">
            Start Analysis
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
            Menu
          </summary>
          <div className="absolute right-0 top-full mt-3 w-80 rounded-[1.5rem] border border-white/10 bg-[#17120e] p-5 shadow-2xl">
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  className="block rounded-xl px-3 py-3 text-white/85 transition hover:bg-white/10 hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                className="mt-2 block rounded-xl bg-[var(--color-accent)] px-3 py-3 text-center font-semibold text-white"
                href="/tools/seasonal-color-analysis"
              >
                Start Analysis
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
