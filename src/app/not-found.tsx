import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell section-space">
      <div className="surface rounded-[2rem] p-8 text-center sm:p-12">
        <p className="eyebrow text-[var(--color-accent)]">Not Found</p>
        <h1 className="mt-3 text-4xl font-semibold">That page does not exist.</h1>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-stone-600">
          The new Next.js rebuild preserves most of the original routes, but this one
          is either missing or still being redesigned.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link className="button-primary" href="/">
            Back Home
          </Link>
          <Link
            className="button-secondary !border-stone-300 !bg-white !text-stone-900"
            href="/palettes"
          >
            Browse Palettes
          </Link>
        </div>
      </div>
    </div>
  );
}
