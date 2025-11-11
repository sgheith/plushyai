import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Plushie - Plushify | AI-Powered Transformation",
  description:
    "Upload your photo and watch AI transform it into an adorable plushie design. Fast, easy, and magical results in seconds!",
  openGraph: {
    title: "Generate Your Plushie - Plushify",
    description: "Transform any photo into an adorable plushie with AI",
    type: "website",
  },
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
