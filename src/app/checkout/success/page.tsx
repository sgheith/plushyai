import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{
    checkout_id?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const checkoutId = params.checkout_id;

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
              <div className="relative bg-primary/10 rounded-full p-6">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your credits are being added to your account. This usually takes
              just a few seconds.
            </p>
            {checkoutId && (
              <p className="text-sm text-muted-foreground">
                Order ID: {checkoutId}
              </p>
            )}
          </div>

          {/* Info Box */}
          <Card className="bg-primary/5 border-primary/20 p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-left space-y-2">
                <h3 className="font-semibold">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your credits will appear in your account shortly</li>
                  <li>• You can start creating plushies right away</li>
                  <li>• Check your email for the receipt</li>
                  <li>
                    • Credits never expire, so use them whenever you want!
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="flex-1">
              <Link href="/generate">
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-muted-foreground pt-4">
            If your credits don&apos;t appear within a few minutes, please
            contact our support team.
          </p>
        </div>
      </Card>
    </main>
  );
}
