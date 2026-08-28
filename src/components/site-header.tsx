import Link from "next/link";
const headerLinks = [
  { href: "/tools/seasonal-color-analysis", label: "Color Analysis" },
  { href: "/palettes", label: "Palettes" },
  { href: "/tools/color-picker", label: "Color Picker" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-ink)]/95 backdrop-blur">
      <div className="shell flex items-center justify-between gap-6 py-4 text-white">
        <Link className="font-display text-3xl tracking-wide text-white md:text-4xl" href="/">
          LOOK PALETTE
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/85 lg:flex">
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              className="transition-opacity hover:opacity-80"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            className="button-primary !bg-[var(--color-accent)]"
            href="/tools/seasonal-color-analysis#early-access"
          >
            Get Early Access
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
            Menu
          </summary>
          <div className="absolute right-0 top-full mt-3 w-80 rounded-[1.5rem] border border-white/10 bg-[#17120e] p-5 shadow-2xl">
            <div className="space-y-2">
              {headerLinks.map((link) => (
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
                href="/tools/seasonal-color-analysis#early-access"
              >
                Get Early Access
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
