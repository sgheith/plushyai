import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { plushieGenerations } from "@/lib/schema";
import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";

/**
 * Inngest function to handle failed and cancelled plushie generation runs
 *
 * This function listens to Inngest system events (failed/cancelled) and updates
 * the generation status in the database. This ensures generations don't get stuck
 * in "processing" state when Inngest functions fail or are cancelled.
 *
 * Triggered by:
 * - inngest/function.failed: When a function exhausts all retries
 * - inngest/function.cancelled: When a function is manually cancelled or times out
 */
export const handleGenerationFailureFunction = inngest.createFunction(
  {
    id: "handle-generation-failure",
    name: "Handle Generation Failure/Cancellation",
  },
  {
    // Listen to both failed and cancelled events for the generate-plushie function
    event: "inngest/function.failed",
    if: 'event.data.function_id == "generate-plushie"',
  },
  async ({ event }) => {
    console.log("[Inngest] Handling generation failure/cancellation", {
      functionId: event.data.function_id,
      runId: event.data.run_id,
      error: event.data.error,
    });

    try {
      // Extract the original event data from the failed/cancelled function
      const originalEvent = event.data.event;

      if (!originalEvent?.data?.generationId) {
        console.error("[Inngest] No generationId found in failed event");
        return;
      }

      const { generationId } = originalEvent.data;

      // Get generation record to find Blob URLs
      const [generation] = await db
        .select()
        .from(plushieGenerations)
        .where(eq(plushieGenerations.id, generationId));

      if (!generation) {
        console.log("[Inngest] Generation not found:", generationId);
        return;
      }

      // Skip if already marked as failed or completed
      if (generation.status !== "processing") {
        console.log("[Inngest] Generation already finalized:", {
          generationId,
          status: generation.status,
        });
        return;
      }

      // Delete Blob storage if URLs exist
      try {
        if (generation.originalImageUrl && generation.originalImageUrl !== "") {
          await del(generation.originalImageUrl);
          console.log("[Inngest] Deleted original image from blob storage");
        }
        if (generation.plushieImageUrl && generation.plushieImageUrl !== "") {
          await del(generation.plushieImageUrl);
          console.log("[Inngest] Deleted generated image from blob storage");
        }
      } catch (cleanupError) {
        console.error("[Inngest] Failed to cleanup blob storage:", cleanupError);
      }

      // Update generation status to failed
      await db
        .update(plushieGenerations)
        .set({
          status: "failed",
          updatedAt: new Date(),
        })
        .where(eq(plushieGenerations.id, generationId));

      console.log("[Inngest] Generation marked as failed:", generationId);
    } catch (error) {
      console.error("[Inngest] Error handling generation failure:", error);
      throw error;
    }
  }
);

/**
 * Separate function to handle cancelled generations
 * This is necessary because cancelled functions have a different event structure
 */
export const handleGenerationCancellationFunction = inngest.createFunction(
  {
    id: "handle-generation-cancellation",
    name: "Handle Generation Cancellation",
  },
  {
    event: "inngest/function.cancelled",
    if: 'event.data.function_id == "generate-plushie"',
  },
  async ({ event }) => {
    console.log("[Inngest] Handling generation cancellation", {
      functionId: event.data.function_id,
      runId: event.data.run_id,
    });

    try {
      // Extract the original event data
      const originalEvent = event.data.event;

      if (!originalEvent?.data?.generationId) {
        console.error("[Inngest] No generationId found in cancelled event");
        return;
      }

      const { generationId } = originalEvent.data;

      // Get generation record
      const [generation] = await db
        .select()
        .from(plushieGenerations)
        .where(eq(plushieGenerations.id, generationId));

      if (!generation) {
        console.log("[Inngest] Generation not found:", generationId);
        return;
      }

      // Skip if already finalized
      if (generation.status !== "processing") {
        console.log("[Inngest] Generation already finalized:", {
          generationId,
          status: generation.status,
        });
        return;
      }

      // Cleanup Blob storage
      try {
        if (generation.originalImageUrl && generation.originalImageUrl !== "") {
          await del(generation.originalImageUrl);
          console.log("[Inngest] Deleted original image from blob storage");
        }
        if (generation.plushieImageUrl && generation.plushieImageUrl !== "") {
          await del(generation.plushieImageUrl);
          console.log("[Inngest] Deleted generated image from blob storage");
        }
      } catch (cleanupError) {
        console.error("[Inngest] Failed to cleanup blob storage:", cleanupError);
      }

      // Mark as failed
      await db
        .update(plushieGenerations)
        .set({
          status: "failed",
          updatedAt: new Date(),
        })
        .where(eq(plushieGenerations.id, generationId));

      console.log("[Inngest] Cancelled generation marked as failed:", generationId);
    } catch (error) {
      console.error("[Inngest] Error handling generation cancellation:", error);
      throw error;
    }
  }
);
