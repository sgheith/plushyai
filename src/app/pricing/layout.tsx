import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Plushify | Affordable Credit Packages",
  description:
    "Choose the perfect credit package for your plushie creations. Simple, transparent pricing with no subscriptions. Credits never expire!",
  openGraph: {
    title: "Pricing - Plushify",
    description: "Choose from our flexible credit packages. Basic, Pro, and Elite options available.",
    type: "website",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
