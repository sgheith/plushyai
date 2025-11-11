import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started - Plushify Documentation",
  description:
    "Quick start guide to creating your first plushie with Plushify. Learn the basics and start transforming photos in minutes!",
};

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
