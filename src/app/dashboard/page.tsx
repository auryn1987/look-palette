import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/coming-soon-panel";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "The personalized dashboard is being redesigned as part of the migration.",
};

export default function DashboardPage() {
  return (
    <ComingSoonPanel
      title="The dashboard is being rethought for the new stack"
      description="The old dashboard depended heavily on Supabase tables and auth state. Rather than copy that structure blindly into Next.js, this migration keeps the route visible while the new backend model is designed more intentionally."
    />
  );
}
