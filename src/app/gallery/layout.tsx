import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Plushify | Your Plushie Collection",
  description:
    "Browse all your created plushie designs in one beautiful gallery. Download, share, and relive your favorite creations.",
  openGraph: {
    title: "Plushie Gallery - Plushify",
    description: "View all your adorable plushie creations",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
