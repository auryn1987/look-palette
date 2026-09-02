import Image from "next/image";
import { EarlyAccessForm } from "@/components/early-access-form";

interface MarketingHeroProps {
  title: string;
  description: string;
  image: string;
  source: string;
  eyebrow?: string;
  id?: string;
}

export function MarketingHero({
  title,
  description,
  image,
  source,
  eyebrow,
  id,
}: MarketingHeroProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-b border-black/10 bg-paper"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/28" />
      </div>
      <div className="shell relative py-12 sm:py-20 lg:py-32">
        <div className="max-w-4xl rounded-3xl bg-paper/82 p-5 shadow-[0_24px_60px_rgba(51,38,22,0.1)] backdrop-blur-sm sm:rounded-4xl sm:p-8 lg:p-10">
          {eyebrow ? (
            <p className="eyebrow text-stone-950">{eyebrow}</p>
          ) : null}
          <h1
            className={`${eyebrow ? "mt-3 sm:mt-5" : ""} max-w-3xl text-balance text-[2.125rem] font-semibold leading-[1.2] text-stone-950 sm:text-5xl sm:leading-[1.1] lg:text-7xl`}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-700 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
            {description}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-950 sm:mt-6 sm:text-sm sm:tracking-[0.16em]">
            <span className="block sm:inline">Free seasonal color analysis. </span>
            <span className="block sm:inline">Coming soon.</span>
          </p>
          <div className="mt-6 max-w-2xl rounded-[1.25rem] bg-white p-4 sm:mt-10 sm:rounded-3xl sm:p-5">
            <EarlyAccessForm
              source={source}
              buttonLabel="Join Waitlist"
              placeholder="Email address"
              theme="light"
            />
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Join the early access list and be among the first to discover
              your palette.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
