import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have a question? Contact Look Palette and we will get back to you.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Contact us"
        description="Have a question about the palette library, the new Next.js rebuild, or what should come next? Send a note and we will get back to you."
        image="/hero/hero-autumn-deep.avif"
        tone="light"
      />
      <div className="shell section-space">
        <div className="surface mx-auto max-w-3xl rounded-4xl p-6 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
