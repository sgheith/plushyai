import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Plushify",
  description:
    "Read our terms of service to understand the rules and guidelines for using Plushify's plushie generation platform.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
