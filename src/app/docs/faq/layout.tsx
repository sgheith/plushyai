import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Plushify Documentation | Frequently Asked Questions",
  description:
    "Find answers to common questions about Plushify, credits, image generation, and more. Get help quickly with our FAQ!",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
