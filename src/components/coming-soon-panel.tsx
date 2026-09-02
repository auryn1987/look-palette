import Link from "next/link";

export function ComingSoonPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="shell section-space">
      <div className="surface rounded-4xl p-8 text-center sm:p-12">
        <p className="eyebrow text-accent">Migration In Progress</p>
        <h1 className="mt-3 text-4xl font-semibold">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-stone-600">
          {description}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link className="button-primary" href="/tools/seasonal-color-analysis">
            Explore the color analysis tool
          </Link>
          <Link
            className="button-secondary border-stone-300! bg-white! text-stone-900!"
            href="/contact"
          >
            Contact for early access
          </Link>
        </div>
      </div>
    </div>
  );
}
