import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/coming-soon-panel";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Account access for Look Palette is being redesigned during the migration.",
};

export default function SignInPage() {
  return (
    <ComingSoonPanel
      title="Account sign-in is not migrated yet"
      description="The old app used Supabase auth, but this new Next.js rebuild focuses first on the public experience and core tools. Auth and account storage should be reintroduced only once the new backend shape is settled."
    />
  );
}
