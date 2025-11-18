"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { plushieGenerations } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { del } from "@vercel/blob";

/**
 * Server action to manually mark a generation as failed
 *
 * This is useful as a fallback when:
 * - Inngest functions are cancelled and don't trigger failure handlers
 * - Generations get stuck in "processing" state
 * - Manual cleanup is needed
 *
 * Features:
 * - Ownership validation (users can only fail their own generations)
 * - Cleanup of Blob storage
 * - Prevents marking completed generations as failed
 */
export async function markGenerationFailed(
  generationId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Auth check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Get generation with ownership validation
    const [generation] = await db
      .select()
      .from(plushieGenerations)
      .where(
        and(
          eq(plushieGenerations.id, generationId),
          eq(plushieGenerations.userId, session.user.id)
        )
      );

    if (!generation) {
      return { success: false, error: "Generation not found" };
    }

    // Don't mark completed generations as failed
    if (generation.status === "completed") {
      return {
        success: false,
        error: "Cannot mark completed generation as failed",
      };
    }

    // Already failed
    if (generation.status === "failed") {
      return { success: true }; // Idempotent
    }

    // Cleanup Blob storage if URLs exist
    try {
      if (generation.originalImageUrl && generation.originalImageUrl !== "") {
        await del(generation.originalImageUrl);
        console.log("[MarkFailed] Deleted original image from blob storage");
      }
      if (generation.plushieImageUrl && generation.plushieImageUrl !== "") {
        await del(generation.plushieImageUrl);
        console.log("[MarkFailed] Deleted generated image from blob storage");
      }
    } catch (cleanupError) {
      console.error(
        "[MarkFailed] Failed to cleanup blob storage:",
        cleanupError
      );
      // Continue anyway - we still want to mark as failed
    }

    // Update status to failed
    await db
      .update(plushieGenerations)
      .set({
        status: "failed",
        updatedAt: new Date(),
      })
      .where(eq(plushieGenerations.id, generationId));

    console.log("[MarkFailed] Generation marked as failed:", generationId);

    return { success: true };
  } catch (error) {
    console.error("[MarkFailed] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to mark as failed",
    };
  }
}
