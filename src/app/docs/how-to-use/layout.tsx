import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use - Plushify Documentation",
  description:
    "Detailed step-by-step guide on using Plushify to transform your photos into adorable plushie designs. Master every feature!",
};

export default function HowToUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
