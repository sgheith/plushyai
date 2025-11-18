"use client";

import { Download, Eye, Trash2, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PlushieCardProps {
  image: string;
  date: string;
  status?: "processing" | "completed" | "failed";
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  onRetry?: () => void;
  onMarkFailed?: () => void;
  isRetrying?: boolean;
  isMarkingFailed?: boolean;
}

// Helper function to format date
function formatGenerationDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PlushieCard({
  image,
  date,
  status = "completed",
  onView,
  onDownload,
  onDelete,
  onRetry,
  onMarkFailed,
  isRetrying = false,
  isMarkingFailed = false,
}: PlushieCardProps) {
  // Check if processing generation is stuck (older than 5 minutes)
  const isStuckProcessing = () => {
    if (status !== "processing") return false;
    const createdAt = new Date(date);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return createdAt < fiveMinutesAgo;
  };

  const stuck = isStuckProcessing();

  // Processing state - show loading skeleton
  if (status === "processing") {
    return (
      <Card className={stuck ? "overflow-hidden border-yellow-500/50" : "overflow-hidden"}>
        <div className="relative aspect-square overflow-hidden bg-muted flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <div>
              <Badge
                variant="outline"
                className={
                  stuck
                    ? "bg-yellow-500/10 text-yellow-600 border-yellow-300"
                    : "bg-blue-500/10 text-blue-600 border-blue-300"
                }
              >
                {stuck ? "Stuck?" : "Processing"}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                {stuck ? "Taking longer than usual..." : "Generating plushie..."}
              </p>
              {stuck && onMarkFailed && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onMarkFailed}
                  disabled={isMarkingFailed}
                  className="mt-3 gap-2"
                >
                  {isMarkingFailed ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Marking...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3" />
                      Mark as Failed
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            {formatGenerationDate(date)}
          </p>
        </div>
      </Card>
    );
  }

  // Failed state - show error icon and retry button
  if (status === "failed") {
    return (
      <Card className="overflow-hidden border-destructive/50">
        <div className="relative aspect-square overflow-hidden bg-destructive/5 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <div>
              <Badge variant="destructive" className="mb-2">
                Failed
              </Badge>
              <p className="text-sm text-muted-foreground mb-3">
                Generation failed
              </p>
              {onRetry && (
                <Button
                  size="sm"
                  onClick={onRetry}
                  disabled={isRetrying}
                  className="gap-2"
                >
                  {isRetrying ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3 w-3" />
                      Retry
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {formatGenerationDate(date)}
          </p>
          {onDelete && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onDelete}
              className="h-8 w-8"
              aria-label="Delete generation"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // Completed state - normal card with image
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={`Generated plushie created on ${formatGenerationDate(date)}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Status badge overlay (top-right corner) */}
        {status === "completed" && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge variant="outline" className="bg-green-500/90 text-white border-green-400">
              Completed
            </Badge>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={onView}
            className="rounded-full"
            aria-label="View plushie"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={onDownload}
            className="rounded-full"
            aria-label="Download plushie"
          >
            <Download className="h-4 w-4" />
          </Button>
          {onDelete && (
            <Button
              size="icon"
              variant="destructive"
              onClick={onDelete}
              className="rounded-full"
              aria-label="Delete plushie"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          {formatGenerationDate(date)}
        </p>
      </div>
    </Card>
  );
}
