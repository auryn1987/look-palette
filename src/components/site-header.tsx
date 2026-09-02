"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const headerLinks = [
  { href: "/tools/seasonal-color-analysis", label: "Color Analysis" },
  { href: "/palettes", label: "Palettes" },
  { href: "/tools/color-picker", label: "Color Picker" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    window.setTimeout(() => setOpen(false), 0);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-white">
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="relative z-50">
        <div className="shell flex items-center justify-between gap-3 py-3 text-white sm:gap-6 sm:py-4">
          <Link
            className="font-display text-[1.65rem] tracking-wide text-white sm:text-3xl md:text-4xl"
            href="/"
            onClick={closeMenu}
          >
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
              className="button-primary bg-accent!"
              href="/tools/seasonal-color-analysis#early-access"
            >
              Get Early Access
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {open ? (
          <nav
            id={menuId}
            className="border-t border-white/10 bg-ink text-white lg:hidden"
            aria-label="Mobile"
          >
            <div className="shell flex flex-col gap-1 py-3">
              {headerLinks.map((link) => (
                <Link
                  key={link.href}
                  className="rounded-xl px-3 py-3 text-base text-white/85 transition hover:bg-white/10 hover:text-white"
                  href={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                className="mt-2 rounded-full bg-accent px-3 py-3 text-center font-semibold text-white"
                href="/tools/seasonal-color-analysis#early-access"
                onClick={closeMenu}
              >
                Get Early Access
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
