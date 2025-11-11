import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Plushify",
  description:
    "Learn how Plushify collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
