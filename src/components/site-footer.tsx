import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerGroups, socialLinks } from "@/lib/site-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-[var(--color-ink)] text-white">
      <div className="shell py-12">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_1.3fr]">
          <div>
            <Link className="font-display text-4xl tracking-wide" href="/">
              LOOK PALETTE
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
              Seasonal color analysis, curated palettes, and practical tools to help
              people build wardrobes that feel more intentional.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-75 transition hover:opacity-100"
                >
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={link.size}
                    height={link.size}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_1fr_1.2fr]">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
                  {group.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      className="block text-sm text-white/75 transition hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
              Newsletter
            </p>
            <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">
              Product updates, palette notes, and new tools sent occasionally.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/55">
          &copy; {year} Look Palette. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
