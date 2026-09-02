import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const faqs = [
  {
    question: "What is Look Palette?",
    answer: (
      <>
        <p>
          Look Palette helps you discover the colors that complement your natural
          coloring.
        </p>
        <p className="mt-4">
          We&apos;re creating a free seasonal color analysis experience that will
          help you discover your season, understand your personal palette, and
          eventually find clothing in colors that work beautifully with it.
        </p>
      </>
    ),
  },
  {
    question: "What is seasonal color analysis?",
    answer: (
      <>
        <p>
          Seasonal color analysis is a way of identifying colors that harmonize
          with your natural coloring, including characteristics such as warmth,
          depth, and intensity.
        </p>
        <p className="mt-4">
          The system groups color palettes into four main seasons: Spring,
          Summer, Autumn, and Winter, with 12 more specific seasonal palettes.
        </p>
      </>
    ),
  },
  {
    question: "How will the Look Palette color analysis work?",
    answer: (
      <>
        <p>
          You&apos;ll be guided through providing photos that can be used to
          analyze your natural coloring and determine which seasonal palette is
          the best match.
        </p>
        <p className="mt-4">
          Your result will include your season, personal color palette, and an
          explanation of the characteristics behind your result.
        </p>
      </>
    ),
  },
  {
    question: "Is Look Palette free?",
    answer: (
      <>
        <p>
          Yes. We&apos;re building Look Palette so that the core seasonal color
          analysis and palette experience can be used for free.
        </p>
        <p className="mt-4">
          In the future, we may introduce optional premium features for people
          who want additional wardrobe and personal styling tools.
        </p>
      </>
    ),
  },
  {
    question: "When will the color analysis be available?",
    answer: (
      <>
        <p>Look Palette is currently preparing for early access.</p>
        <p className="mt-4">
          Join the early access list and we&apos;ll email you when the
          personalized color analysis is ready to try.
        </p>
      </>
    ),
  },
  {
    question: "What are the 12 seasonal color palettes?",
    answer: (
      <>
        <p>
          The 12-season system expands the four traditional seasons into more
          specific palettes:
        </p>
        <div className="mt-4 space-y-3">
          <p>
            <strong>Spring:</strong> Light Spring, Warm Spring, Bright Spring
          </p>
          <p>
            <strong>Summer:</strong> Light Summer, Cool Summer, Soft Summer
          </p>
          <p>
            <strong>Autumn:</strong> Soft Autumn, Warm Autumn, Deep Autumn
          </p>
          <p>
            <strong>Winter:</strong> Deep Winter, Cool Winter, Bright Winter
          </p>
        </div>
        <p className="mt-4">
          You can explore all 12 in our free{" "}
          <Link className="font-semibold text-brand" href="/palettes">
            Palette Library
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    question: "Do I need to know my season already?",
    answer: (
      <>
        <p>
          No. That&apos;s exactly what the personalized color analysis is
          designed to help you discover.
        </p>
        <p className="mt-4">
          If you already know or suspect your season, you can also explore the{" "}
          <Link className="font-semibold text-brand" href="/palettes">
            Palette Library
          </Link>{" "}
          to learn more about its colors and characteristics.
        </p>
      </>
    ),
  },
  {
    question: "What kind of photo will I need?",
    answer: (
      <>
        <p>
          When personalized analysis becomes available, Look Palette will provide
          guidance for taking or choosing suitable photos.
        </p>
        <p className="mt-4">
          In general, photos that clearly show your natural coloring under
          neutral, even lighting will be the most useful.
        </p>
      </>
    ),
  },
  {
    question: "Will Look Palette recommend clothes for my season?",
    answer: (
      <>
        <p>That&apos;s where we&apos;re heading.</p>
        <p className="mt-4">
          We want Look Palette to make your seasonal palette useful in everyday
          life by helping you discover clothing in colors that complement your
          season.
        </p>
        <p className="mt-4">
          The initial experience will focus on getting your seasonal color
          analysis right, with personalized shopping features following as
          Look Palette grows.
        </p>
      </>
    ),
  },
  {
    question: "Can I explore Look Palette without uploading a photo?",
    answer: (
      <>
        <p>Yes.</p>
        <p className="mt-4">
          Our{" "}
          <Link className="font-semibold text-brand" href="/palettes">
            Palette Library
          </Link>{" "}
          is available for anyone who wants to explore the 12 seasons, and the{" "}
          <Link
            className="font-semibold text-brand"
            href="/tools/color-picker"
          >
            Image Color Picker
          </Link>{" "}
          can be used to identify colors from your own images.
        </p>
      </>
    ),
  },
  {
    question: "What happens when I join early access?",
    answer: (
      <>
        <p>
          We&apos;ll save your email address and let you know when
          Look Palette&apos;s personalized seasonal color analysis becomes
          available.
        </p>
        <p className="mt-4">
          Joining the early access list is free and doesn&apos;t require you to
          purchase anything.
        </p>
      </>
    ),
  },
  {
    question: "How will my photos be handled?",
    answer: (
      <>
        <p>
          We&apos;re designing Look Palette with privacy in mind. Before
          photo-based analysis launches, we&apos;ll clearly explain how uploaded
          images are processed, stored, and deleted so you can make an informed
          choice before uploading anything.
        </p>
        <p className="mt-4">
          You can read our{" "}
          <Link
            className="font-semibold text-brand"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>{" "}
          for information about data currently collected through the website.
        </p>
      </>
    ),
  },
  {
    question: "Is seasonal color analysis exact?",
    answer: (
      <>
        <p>
          Seasonal color analysis is a styling tool rather than an exact
          science. Results can also be affected by factors such as lighting,
          camera processing, makeup, hair color, and photo quality.
        </p>
        <p className="mt-4">
          Look Palette is designed to provide useful guidance for discovering
          colors that complement you, not rules about what you can or can&apos;t
          wear.
        </p>
      </>
    ),
  },
  {
    question: "Still have a question?",
    answer: (
      <p>
        We&apos;d be happy to hear from you. Visit our{" "}
        <Link className="font-semibold text-brand" href="/contact">
          Contact page
        </Link>{" "}
        to get in touch.
      </p>
    ),
  },
] as const;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Everything you need to know about Look Palette, seasonal color analysis, and early access.",
};

export default function FaqPage() {
  return (
    <div>
      <PageHero
        title="Frequently Asked Questions"
        description="Everything you need to know about Look Palette, seasonal color analysis, and early access."
        image="/hero/hero-image-faq.avif"
        tone="light"
      />
      <div className="shell section-space">
        <div className="surface rounded-4xl p-6 sm:p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-stone-950 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone-600">
              Everything you need to know about Look Palette, seasonal color
              analysis, and early access.
            </p>
          </div>
          <div className="mt-10 space-y-6">
            {faqs.map((item) => (
              <section
                key={item.question}
                className="rounded-[1.75rem] border border-black/10 bg-white p-6 sm:p-8"
              >
                <h3 className="text-2xl font-semibold text-stone-950">
                  {item.question}
                </h3>
                <div className="mt-4 leading-8 text-stone-600">{item.answer}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
