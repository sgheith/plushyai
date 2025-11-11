import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Plushify",
  description:
    "Learn about how Plushify uses cookies and similar technologies to enhance your browsing experience.",
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
