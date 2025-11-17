"use client";

import { Download, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlushieCardProps {
  image: string;
  date: string;
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
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
  onView,
  onDownload,
  onDelete,
}: PlushieCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={`Generated plushie created on ${formatGenerationDate(date)}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

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
