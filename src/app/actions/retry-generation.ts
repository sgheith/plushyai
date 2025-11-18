"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { plushieGenerations } from "@/lib/schema";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { inngest } from "@/inngest/client";

/**
 * Server action to retry a failed plushie generation
 *
 * Loads the original image from blob storage and re-triggers the Inngest function.
 * No additional credit is charged for retries.
 *
 * @param generationId - UUID of the failed generation to retry
 * @returns Success response or error
 */
export async function retryGeneration(generationId: string): Promise<{
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

    // 2. Query generation record
    const [generation] = await db
      .select()
      .from(plushieGenerations)
      .where(eq(plushieGenerations.id, generationId));

    if (!generation) {
      return { success: false, error: "Generation not found." };
    }

    // 3. Verify ownership
    if (generation.userId !== userId) {
      return { success: false, error: "Access denied. This is not your generation." };
    }

    // 4. Verify status is "failed"
    if (generation.status !== "failed") {
      return {
        success: false,
        error: `Cannot retry generation with status "${generation.status}". Only failed generations can be retried.`,
      };
    }

    // 5. Check if original image URL exists
    if (!generation.originalImageUrl) {
      return {
        success: false,
        error: "Original image not found. Cannot retry generation.",
      };
    }

    // 6. Load original image from Blob storage
    const imageResponse = await fetch(generation.originalImageUrl);
    if (!imageResponse.ok) {
      return {
        success: false,
        error: "Failed to load original image from storage.",
      };
    }

    const imageBlob = await imageResponse.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // Determine image type from URL or default to PNG
    const imageType = generation.originalImageUrl.includes(".png")
      ? "image/png"
      : generation.originalImageUrl.includes(".jpg") || generation.originalImageUrl.includes(".jpeg")
      ? "image/jpeg"
      : "image/png";

    const imageData = `data:${imageType};base64,${base64Image}`;

    // 7. Update status to "processing"
    await db
      .update(plushieGenerations)
      .set({ status: "processing" })
      .where(eq(plushieGenerations.id, generationId));

    // 8. Send Inngest event to retry generation
    // Use generationId with retry timestamp for idempotency
    await inngest.send({
      id: `plushie-retry-${generationId}-${Date.now()}`,
      name: "plushie/generate.requested",
      data: {
        generationId,
        userId,
        imageData,
        imageType,
      },
    });

    console.log(`[Retry Action] Inngest event sent for retry of generation ${generationId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("[Retry Action] Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to retry generation";

    return {
      success: false,
      error: `Failed to retry generation: ${errorMessage}. Please try again.`,
    };
  }
}
