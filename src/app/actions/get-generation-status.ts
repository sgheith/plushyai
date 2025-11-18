"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { plushieGenerations } from "@/lib/schema";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

/**
 * Server action to check the status of a plushie generation
 *
 * Used by client-side polling to track background job progress.
 * Validates ownership to prevent users from checking other users' generations.
 *
 * @param generationId - UUID of the generation to check
 * @returns Generation status with URLs if available
 */
export async function getGenerationStatus(generationId: string): Promise<{
  success: boolean;
  status?: "processing" | "completed" | "failed";
  originalImageUrl?: string;
  plushieImageUrl?: string;
  subjectType?: string;
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

    // 4. Return status with available data
    return {
      success: true,
      status: generation.status,
      originalImageUrl: generation.originalImageUrl || undefined,
      plushieImageUrl: generation.plushieImageUrl || undefined,
      subjectType: generation.subjectType,
    };
  } catch (error) {
    console.error("[Get Status Action] Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to check status";

    return {
      success: false,
      error: `Failed to check generation status: ${errorMessage}`,
    };
  }
}
