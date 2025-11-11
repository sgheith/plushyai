import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tips & Best Practices - Plushify Documentation",
  description:
    "Expert tips for getting the best results from your plushie generations. Learn photo upload best practices and optimization techniques!",
};

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
