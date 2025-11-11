import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - Plushify",
  description:
    "Understand our refund policy for credit purchases. Learn about eligibility, process, and timeframes for refunds.",
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
