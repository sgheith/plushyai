"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
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
import {
  mockGenerations,
  formatGenerationDate,
  type PlushieGeneration,
} from "@/lib/mock-data";

export default function GalleryPage() {
  const [selectedGeneration, setSelectedGeneration] =
    useState<PlushieGeneration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle viewing a plushie in the modal
  const handleView = (generation: PlushieGeneration) => {
    setSelectedGeneration(generation);
    setIsModalOpen(true);
  };

  // Handle downloading a plushie (mock)
  const handleDownload = (generation: PlushieGeneration) => {
    // Mock download functionality
    // In a real app, this would trigger an actual download
    alert(`Downloading ${generation.id}... (mock)`);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Wait for animation to complete before clearing selection
    setTimeout(() => setSelectedGeneration(null), 200);
  };

  // Show empty state if no generations
  if (mockGenerations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Breadcrumbs className="mb-4" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Plushie Gallery</h1>
              <p className="text-muted-foreground">
                {mockGenerations.length} plushie
                {mockGenerations.length !== 1 ? "s" : ""} created
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockGenerations.map((generation) => (
            <PlushieCard
              key={generation.id}
              image={generation.plushieImage}
              date={generation.createdAt}
              onView={() => handleView(generation)}
              onDownload={() => handleDownload(generation)}
            />
          ))}
        </div>
      </div>

      {/* Full-Size Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Plushie Details</DialogTitle>
            <DialogDescription>
              {selectedGeneration && (
                <>
                  Created on{" "}
                  {formatGenerationDate(selectedGeneration.createdAt)}
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
                beforeImage={selectedGeneration.originalImage}
                afterImage={selectedGeneration.plushieImage}
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
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  size="lg"
                >
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
    </>
  );
}
