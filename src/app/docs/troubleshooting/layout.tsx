import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Troubleshooting - Plushify Documentation",
  description:
    "Solutions to common issues with Plushify. Get help with upload problems, generation errors, and account issues.",
};

export default function TroubleshootingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
