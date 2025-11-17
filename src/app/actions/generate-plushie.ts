"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, plushieGenerations } from "@/lib/schema";
import { headers } from "next/headers";
import { put, del } from "@vercel/blob";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { eq, and, gte, sql } from "drizzle-orm";

/**
 * Server action to generate a plushified version of an uploaded image
 *
 * Flow:
 * 1. Authenticate user
 * 2. Validate user has sufficient credits
 * 3. Upload original image to Vercel Blob
 * 4. Analyze image using Gemini vision model
 * 5. Generate plushified version using Gemini image generation
 * 6. Upload generated image to Vercel Blob
 * 7. Deduct credit atomically
 * 8. Create database record
 *
 * @param formData - Form data containing the image file
 * @returns Success response with generation data or error
 */
export async function generatePlushie(formData: FormData): Promise<{
  success: boolean;
  data?: {
    id: string;
    originalImageUrl: string;
    plushieImageUrl: string;
    subjectType: string;
  };
  error?: string;
}> {
  let originalBlobUrl: string | null = null;
  let generatedBlobUrl: string | null = null;

  try {
    // 1. Authenticate user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized. Please sign in." };
    }

    const userId = session.user.id;

    // 2. Validate user has sufficient credits
    const [currentUser] = await db
      .select({ credits: user.credits })
      .from(user)
      .where(eq(user.id, userId));

    if (!currentUser || currentUser.credits < 1) {
      return {
        success: false,
        error: "Insufficient credits. You need at least 1 credit to generate a plushie.",
      };
    }

    // 3. Extract and validate image file
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

    // 4. Upload original image to Vercel Blob
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const originalBlob = await put(
      `plushify/originals/${userId}/${timestamp}.${extension}`,
      file,
      {
        access: "public",
        contentType: file.type,
      }
    );
    originalBlobUrl = originalBlob.url;

    // 5. Convert image to base64 for AI analysis
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const imageDataUrl = `data:${file.type};base64,${base64Image}`;

    // 6. Step 1: Analyze image using Gemini vision model
    console.log("=== STEP 1: IMAGE ANALYSIS ===");
    const analysisResult = await generateText({
      model: openrouter("google/gemini-2.5-flash-image"),
      messages: [
        {
          role: "user",
          content: [
            { type: "image", image: imageDataUrl },
            {
              type: "text",
              text: `Analyze this image and provide:
1. A detailed description of the main subject
2. Identify if it's a person, pet, or other object
3. Key features that should be emphasized in a plushie version
4. Color palette and notable characteristics

Format your response as:
Subject Type: [person/pet/other]
Description: [detailed description]
Key Features: [features to emphasize]
Colors: [main colors]`,
            },
          ],
        },
      ],
    });

    console.log("Analysis completed successfully");
    console.log("Analysis text length:", analysisResult.text.length);

    // Extract subject type from analysis
    const analysisText = analysisResult.text;
    let subjectType: "person" | "pet" | "other" = "other";
    if (analysisText.toLowerCase().includes("subject type: person")) {
      subjectType = "person";
    } else if (analysisText.toLowerCase().includes("subject type: pet")) {
      subjectType = "pet";
    }

    // 7. Step 2: Generate plushified image using Gemini
    const generationPrompt = `Create a cute, adorable plushified version of the following subject.
Transform it into a soft, cuddly plush toy with:
- Exaggerated cute features (big eyes, round shapes)
- Soft, huggable appearance
- Simplified but recognizable design
- Warm, inviting colors
- Professional plush toy quality

Subject Analysis:
${analysisText}

Make it look like a high-quality, professionally manufactured plush toy that someone would want to cuddle.`;

    console.log("=== STEP 2: IMAGE GENERATION ===");

    // 8. Generate plushified image using Gemini via OpenRouter
    // Use the -preview model and include the source image for better results
    const generationResult = await generateText({
      model: openrouter("google/gemini-2.5-flash-image-preview"),
      messages: [
        {
          role: "user",
          content: [
            { type: "image", image: imageDataUrl },
            { type: "text", text: generationPrompt },
          ],
        },
      ],
    });

    console.log("Generation completed");

    // 9. Extract generated image from AI SDK response using result.files
    // For language models with multi-modal outputs, images are in result.files
    const files = generationResult.files || [];

    console.log("Files in response:", files.length);

    const imageFile = files.find((file) =>
      file.mediaType?.startsWith("image/")
    );

    if (!imageFile) {
      console.error("ERROR: No image file found in response");
      console.error("Available files:", files);
      throw new Error("No image generated by AI model");
    }

    console.log("Image file found:", {
      mediaType: imageFile.mediaType,
      size: imageFile.uint8Array.length,
    });

    // Use uint8Array directly from the file object
    const generatedImageBuffer = Buffer.from(imageFile.uint8Array);

    // 10. Upload generated image to Vercel Blob
    const generatedBlob = await put(
      `plushify/generated/${userId}/${timestamp}.png`,
      generatedImageBuffer,
      {
        access: "public",
        contentType: "image/png",
      }
    );
    generatedBlobUrl = generatedBlob.url;

    // 11. Atomic credit deduction
    const creditResult = await db
      .update(user)
      .set({ credits: sql`${user.credits} - 1` })
      .where(and(eq(user.id, userId), gte(user.credits, 1)))
      .returning();

    if (creditResult.length === 0) {
      throw new Error(
        "Credit deduction failed. Insufficient credits or concurrent modification."
      );
    }

    // 12. Create database record
    const [generation] = await db
      .insert(plushieGenerations)
      .values({
        userId,
        originalImageUrl: originalBlobUrl,
        plushieImageUrl: generatedBlobUrl,
        subjectType,
        status: "completed",
      })
      .returning();

    return {
      success: true,
      data: {
        id: generation.id,
        originalImageUrl: generation.originalImageUrl,
        plushieImageUrl: generation.plushieImageUrl,
        subjectType: generation.subjectType,
      },
    };
  } catch (error) {
    // Cleanup: Delete uploaded blobs if generation fails
    try {
      if (originalBlobUrl) {
        await del(originalBlobUrl);
      }
      if (generatedBlobUrl) {
        await del(generatedBlobUrl);
      }
    } catch (cleanupError) {
      console.error("Failed to cleanup blob storage:", cleanupError);
    }

    console.error("Generation error:", error);

    // Return user-friendly error message
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate plushie";

    return {
      success: false,
      error: `Generation failed: ${errorMessage}. Please try again.`,
    };
  }
}
