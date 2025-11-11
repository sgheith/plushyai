"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";

export default function GenerateError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Generation error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Generation Failed
            </h1>
            <p className="text-lg text-muted-foreground">
              We couldn&apos;t load the plushie generation page. This might be a temporary issue.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg text-left space-y-2">
            <h3 className="font-semibold text-sm">Troubleshooting suggestions:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Check your internet connection</li>
              <li>• Clear your browser cache and cookies</li>
              <li>• Try using a different browser</li>
              <li>• Make sure you have enough credits</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={reset} size="lg" className="gap-2">
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/dashboard">
                <Home className="w-5 h-5" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Need help?{" "}
            <Link href="/docs/troubleshooting" className="text-primary hover:underline">
              Visit our troubleshooting guide
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
