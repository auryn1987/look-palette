import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/coming-soon-panel";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Account creation for Look Palette is being redesigned during the migration.",
};

export default function SignUpPage() {
  return (
    <ComingSoonPanel
      title="Account creation is not migrated yet"
      description="The old app's Supabase sign-up flow has been intentionally paused while the new Next.js architecture is established. The public pages, palette library, and tools are ready now; auth can be added back cleanly once the product direction is locked."
    />
  );
}
