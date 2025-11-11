"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        <div className="text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-muted-foreground">
              We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault!
            </p>
          </div>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === "development" && (
            <Card className="p-4 bg-muted text-left">
              <p className="text-sm font-mono text-destructive break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={reset} size="lg" className="gap-2">
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/">
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-sm text-muted-foreground pt-4">
            If this problem persists, please{" "}
            <Link href="/docs/troubleshooting" className="text-primary hover:underline">
              check our troubleshooting guide
            </Link>{" "}
            or contact support.
          </p>
        </div>
      </Card>
    </div>
  );
}
