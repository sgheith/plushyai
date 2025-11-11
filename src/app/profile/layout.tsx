import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Plushify | Your Account",
  description:
    "View your account information, credit balance, and usage statistics. Manage your Plushify profile and preferences.",
  openGraph: {
    title: "Your Profile - Plushify",
    description: "Manage your Plushify account and view your statistics",
    type: "website",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
