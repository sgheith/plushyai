import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - Plushify | Help & Guides",
  description:
    "Comprehensive guides, tutorials, and FAQs to help you create amazing plushie designs with Plushify. Get started quickly!",
  openGraph: {
    title: "Documentation - Plushify",
    description: "Learn how to create amazing plushie designs with our comprehensive guides",
    type: "website",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
