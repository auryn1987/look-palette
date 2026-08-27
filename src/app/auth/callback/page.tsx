import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/coming-soon-panel";

export const metadata: Metadata = {
  title: "Auth Callback",
  description: "Authentication callbacks are not configured in the new Next.js app yet.",
};

export default function AuthCallbackPage() {
  return (
    <ComingSoonPanel
      title="Authentication callbacks are not configured yet"
      description="The old project used Supabase-based callbacks. This placeholder keeps the route from breaking while the new auth approach is defined."
    />
  );
}
