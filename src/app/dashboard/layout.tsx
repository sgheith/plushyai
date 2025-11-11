import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Plushify | Your Plushie Control Center",
  description:
    "Manage your plushie creations, track your credits, and view your usage statistics. Your personal Plushify dashboard.",
  openGraph: {
    title: "Dashboard - Plushify",
    description: "Your personal plushie creation dashboard",
    type: "website",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
