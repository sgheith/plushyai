"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Previous Button */}
      {hasPrevPage ? (
        <Button asChild variant="outline">
          <Link
            href={`${baseUrl}?page=${prevPage}`}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled aria-label="No previous page">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
      )}

      {/* Page Info */}
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next Button */}
      {hasNextPage ? (
        <Button asChild variant="outline">
          <Link href={`${baseUrl}?page=${nextPage}`} aria-label="Go to next page">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled aria-label="No next page">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
}
