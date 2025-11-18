"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlushieCard } from "@/components/plushie/plushie-card";
import { BeforeAfterSlider } from "@/components/plushie/before-after-slider";
import { EmptyState } from "@/components/gallery/empty-state";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Pagination } from "@/components/gallery/pagination";
import { DeleteConfirmationDialog } from "@/components/gallery/delete-confirmation-dialog";
import { deleteGeneration } from "@/app/actions/delete-generation";
import { retryGeneration } from "@/app/actions/retry-generation";
import { markGenerationFailed } from "@/app/actions/mark-generation-failed";

interface Generation {
  id: string;
  originalImageUrl: string;
  plushieImageUrl: string;
  subjectType: string;
  status: string;
  createdAt: Date;
}

interface GalleryClientProps {
  generations: Generation[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export function GalleryClient({
  generations,
  totalCount,
  totalPages,
  currentPage,
}: GalleryClientProps) {
  const [selectedGeneration, setSelectedGeneration] =
    useState<Generation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [generationToDelete, setGenerationToDelete] = useState<string | null>(
    null
  );
  const [deletingGenerationId, setDeletingGenerationId] = useState<
    string | null
  >(null);
  const [retryingGenerationId, setRetryingGenerationId] = useState<
    string | null
  >(null);
  const [markingFailedId, setMarkingFailedId] = useState<string | null>(null);

  // Handle viewing a plushie in the modal
  const handleView = (generation: Generation) => {
    setSelectedGeneration(generation);
    setIsModalOpen(true);
  };

  // Handle downloading a plushie
  const handleDownload = async (generation: Generation) => {
    try {
      // Create a link and trigger download
      const link = document.createElement("a");
      link.href = generation.plushieImageUrl;
      link.download = `plushie-${generation.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started");
    } catch {
      toast.error("Failed to download plushie");
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Wait for animation to complete before clearing selection
    setTimeout(() => setSelectedGeneration(null), 200);
  };

  // Handle delete button click
  const handleDeleteClick = (generationId: string) => {
    setGenerationToDelete(generationId);
    setDeleteDialogOpen(true);
  };

  // Handle confirmed deletion
  const handleDeleteConfirm = async () => {
    if (!generationToDelete) return;

    setDeletingGenerationId(generationToDelete);

    try {
      const result = await deleteGeneration(generationToDelete);

      if (result.success) {
        // Show success toast
        toast.success("Plushie deleted successfully");

        // Close dialog
        setDeleteDialogOpen(false);
        setGenerationToDelete(null);

        // Refresh the page to show updated list
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to delete generation");
      }
    } catch {
      toast.error("An error occurred while deleting the generation");
    } finally {
      setDeletingGenerationId(null);
    }
  };

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setGenerationToDelete(null);
  };

  // Handle retry for failed generations
  const handleRetry = async (generationId: string) => {
    setRetryingGenerationId(generationId);

    try {
      const result = await retryGeneration(generationId);

      if (result.success) {
        toast.success("Generation retry started! The page will refresh in a moment.");
        // Refresh to show updated status
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(result.error || "Failed to retry generation");
      }
    } catch (error) {
      console.error("Retry error:", error);
      toast.error("An error occurred while retrying the generation");
    } finally {
      setRetryingGenerationId(null);
    }
  };

  // Handle marking stuck generation as failed
  const handleMarkFailed = async (generationId: string) => {
    setMarkingFailedId(generationId);

    try {
      const result = await markGenerationFailed(generationId);

      if (result.success) {
        toast.success("Generation marked as failed. You can retry it now.");
        // Refresh to show updated status
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(result.error || "Failed to mark generation as failed");
      }
    } catch (error) {
      console.error("Mark failed error:", error);
      toast.error("An error occurred while marking the generation as failed");
    } finally {
      setMarkingFailedId(null);
    }
  };

  // Format date helper
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Show empty state if no generations
  if (generations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <EmptyState />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <Breadcrumbs className="mb-4" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Plushie Gallery</h1>
              <p className="text-muted-foreground">
                {totalCount} plushie{totalCount !== 1 ? "s" : ""} created
              </p>
            </div>

            <Button asChild size="lg">
              <Link href="/generate">
                <Plus className="mr-2 h-5 w-5" />
                Generate New
              </Link>
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {generations.map((generation) => (
            <PlushieCard
              key={generation.id}
              image={generation.plushieImageUrl}
              date={generation.createdAt.toString()}
              status={generation.status as "processing" | "completed" | "failed"}
              onView={() => handleView(generation)}
              onDownload={() => handleDownload(generation)}
              onDelete={() => handleDeleteClick(generation.id)}
              onRetry={() => handleRetry(generation.id)}
              onMarkFailed={() => handleMarkFailed(generation.id)}
              isRetrying={retryingGenerationId === generation.id}
              isMarkingFailed={markingFailedId === generation.id}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/gallery"
          />
        )}
      </div>

      {/* Full-Size Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Plushie Details</DialogTitle>
            <DialogDescription>
              {selectedGeneration && (
                <>
                  Created on {formatDate(selectedGeneration.createdAt)}
                  {" · "}
                  Subject type: {selectedGeneration.subjectType}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedGeneration && (
            <div className="space-y-6">
              {/* Before/After Slider */}
              <BeforeAfterSlider
                beforeImage={selectedGeneration.originalImageUrl}
                afterImage={selectedGeneration.plushieImageUrl}
                className="max-w-2xl mx-auto"
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => handleDownload(selectedGeneration)}
                  size="lg"
                >
                  Download Plushie
                </Button>
                <Button variant="outline" onClick={handleCloseModal} size="lg">
                  Close
                </Button>
              </div>

              {/* Additional Details */}
              <div className="text-center text-sm text-muted-foreground border-t pt-4">
                <p>Generation ID: {selectedGeneration.id}</p>
                <p className="mt-1">
                  Status:{" "}
                  <span className="capitalize text-green-600 font-medium">
                    {selectedGeneration.status}
                  </span>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={deletingGenerationId === generationToDelete}
      />
    </>
  );
}
