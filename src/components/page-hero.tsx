import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description: string;
  image: string;
  tone?: "light" | "dark";
  overlay?: "light" | "dark" | "none";
}

export function PageHero({
  title,
  description,
  image,
  tone = "dark",
  overlay = tone,
}: PageHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-black/10 bg-stone-900">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {overlay === "none" ? null : (
          <div
            className={cn(
              "absolute inset-0",
              overlay === "dark"
                ? "bg-linear-to-r from-black/65 via-black/35 to-black/20"
                : "bg-linear-to-r from-white/70 via-white/45 to-white/20",
            )}
          />
        )}
      </div>
      <div className="shell relative py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p
            className={cn(
              "eyebrow mb-3 sm:mb-4",
              tone === "dark" ? "text-white/80" : "text-stone-700",
            )}
          >
            Look Palette
          </p>
          <h1
            className={cn(
              "text-balance text-[2.125rem] font-semibold leading-[1.2] sm:text-5xl sm:leading-[1.1] lg:text-6xl",
              tone === "dark" ? "text-white" : "text-stone-950",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8 lg:text-xl",
              tone === "dark" ? "text-white/85" : "text-stone-800",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
