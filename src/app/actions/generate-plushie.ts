"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, plushieGenerations } from "@/lib/schema";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { inngest } from "@/inngest/client";

/**
 * Server action to initiate background plushie generation via Inngest
 *
 * Refactored to use Inngest background jobs for improved observability,
 * reliability, and user experience. The generation now runs asynchronously.
 *
 * Flow:
 * 1. Authenticate user
 * 2. Validate image file (type, size)
 * 3. Check available credits (total credits - processing count)
 * 4. Create database record with status="processing"
 * 5. Convert image to base64
 * 6. Send Inngest event to trigger background job
 * 7. Return immediately with generationId for client polling
 *
 * @param formData - Form data containing the image file
 * @returns Success response with generationId or error
 */
export async function generatePlushie(formData: FormData): Promise<{
  success: boolean;
  generationId?: string;
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

    // 2. Extract and validate image file
    const file = formData.get("image") as File;
    if (!file) {
      return { success: false, error: "No image file provided." };
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image." };
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: "Image file is too large. Maximum size is 10MB.",
      };
    }

    // 3. Check available credits (total credits - processing count)
    // This ensures users can't start generations they can't afford
    const [creditCheck] = await db
      .select({
        credits: user.credits,
        processingCount: sql<number>`(
          SELECT COUNT(*)::int
          FROM ${plushieGenerations}
          WHERE ${plushieGenerations.userId} = ${userId}
          AND ${plushieGenerations.status} = 'processing'
        )`,
      })
      .from(user)
      .where(eq(user.id, userId));

    if (!creditCheck) {
      return { success: false, error: "User not found." };
    }

    // Calculate available credits (reserved credits are counted as in-use)
    const availableCredits = creditCheck.credits - creditCheck.processingCount;

    if (availableCredits < 1) {
      return {
        success: false,
        error: "Insufficient available credits. Please wait for pending generations to complete or purchase more credits.",
      };
    }

    // Check concurrent generation limit (max 5 processing per user)
    if (creditCheck.processingCount >= 5) {
      return {
        success: false,
        error: "You have 5 generations in progress. Please wait for one to complete.",
      };
    }

    // 4. Create database record with status="processing"
    // Note: originalImageUrl and plushieImageUrl will be updated by Inngest function
    // We use empty strings as placeholders to satisfy NOT NULL constraints
    const [generation] = await db
      .insert(plushieGenerations)
      .values({
        userId,
        originalImageUrl: "",
        plushieImageUrl: "",
        subjectType: "other",
        status: "processing",
      })
      .returning();

    const generationId = generation.id;

    // 5. Convert image to base64 for Inngest event payload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const imageData = `data:${file.type};base64,${base64Image}`;

    // 6. Send Inngest event to trigger background job
    // Use generationId as event ID for idempotency (prevents duplicate processing)
    await inngest.send({
      id: `plushie-generation-${generationId}`,
      name: "plushie/generate.requested",
      data: {
        generationId,
        userId,
        imageData,
        imageType: file.type,
      },
    });

    console.log(`[Generate Action] Inngest event sent for generation ${generationId}`);

    // 7. Return immediately with generationId for client polling
    return {
      success: true,
      generationId,
    };
  } catch (error) {
    console.error("[Generate Action] Error:", error);

    // Return user-friendly error message
    const errorMessage =
      error instanceof Error ? error.message : "Failed to start generation";

    return {
      success: false,
      error: `Failed to start generation: ${errorMessage}. Please try again.`,
    };
  }
}
