import type { Metadata } from "next";
import { ImageColorPicker } from "@/components/image-color-picker";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Image Color Picker",
  description:
    "Upload an image, sample its colors, and export a custom palette in multiple formats.",
};

export default function ColorPickerPage() {
  return (
    <div>
      <PageHero
        title="Image Color Picker"
        description="Upload a photo, click the swatches that catch your eye, and build a custom palette you can actually reuse."
        image="/hero/hero-image-color-picker.avif"
        tone="light"
        overlay="none"
      />
      <div className="shell section-space">
        <ImageColorPicker />
      </div>
    </div>
  );
}
