"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { plushieGenerations } from "@/lib/schema";
import { headers } from "next/headers";
import { del } from "@vercel/blob";
import { eq, and } from "drizzle-orm";

/**
 * Server action to delete a plushie generation
 *
 * Flow:
 * 1. Authenticate user
 * 2. Verify ownership of generation
 * 3. Delete original image from Vercel Blob
 * 4. Delete generated image from Vercel Blob
 * 5. Delete database record
 *
 * @param generationId - UUID of the generation to delete
 * @returns Success status or error message
 */
export async function deleteGeneration(generationId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // 1. Authenticate user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized. Please sign in." };
    }

    const userId = session.user.id;

    // 2. Verify ownership and fetch generation details
    const [generation] = await db
      .select()
      .from(plushieGenerations)
      .where(
        and(
          eq(plushieGenerations.id, generationId),
          eq(plushieGenerations.userId, userId)
        )
      );

    if (!generation) {
      return {
        success: false,
        error: "Generation not found or you don't have permission to delete it.",
      };
    }

    // 3. Delete images from Vercel Blob
    const blobDeletionErrors: string[] = [];

    // Delete original image
    try {
      await del(generation.originalImageUrl);
    } catch (error) {
      console.error("Failed to delete original image:", error);
      blobDeletionErrors.push("original image");
    }

    // Delete generated image
    try {
      await del(generation.plushieImageUrl);
    } catch (error) {
      console.error("Failed to delete generated image:", error);
      blobDeletionErrors.push("generated image");
    }

    // 4. Delete database record (even if blob deletion fails)
    await db
      .delete(plushieGenerations)
      .where(
        and(
          eq(plushieGenerations.id, generationId),
          eq(plushieGenerations.userId, userId)
        )
      );

    // 5. Return result with warnings if blob deletion failed
    if (blobDeletionErrors.length > 0) {
      console.warn(
        `Generation ${generationId} deleted, but failed to delete: ${blobDeletionErrors.join(", ")}`
      );
      // Still return success since database record was deleted
      return {
        success: true,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting generation:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete generation";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
