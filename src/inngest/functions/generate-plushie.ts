import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { user, plushieGenerations, creditTransactions } from "@/lib/schema";
import { put, del } from "@vercel/blob";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { eq, and, gte, sql } from "drizzle-orm";
import { NonRetriableError } from "inngest";

/**
 * Inngest background function to generate plushified versions of uploaded images
 *
 * This function runs asynchronously with:
 * - 5 concurrent executions per user (prevents overwhelming AI APIs)
 * - 3 retry attempts with exponential backoff
 * - Automatic cleanup on failure
 * - Step-based execution for granular observability
 *
 * Flow:
 * 1. Upload original image to Vercel Blob
 * 2. Analyze image using Gemini vision model
 * 3. Generate plushified version using Gemini image generation
 * 4. Upload generated image to Vercel Blob
 * 5. Deduct credit and finalize generation
 */
export const generatePlushieFunction = inngest.createFunction(
  {
    id: "generate-plushie",
    // Retry configuration: 3 attempts with exponential backoff
    retries: 3,
    // Concurrency limit: max 5 concurrent generations per user
    concurrency: {
      limit: 5,
      key: "event.data.userId",
    },
    // Failure handler to cleanup and update status
    onFailure: async ({ event, error, step }) => {
      // Type-safe event data access
      const eventData = event.data.event.data as {
        generationId: string;
        userId: string;
        imageData: string;
        imageType: string;
      };

      console.error("[Inngest] Generation failed", {
        generationId: eventData.generationId,
        userId: eventData.userId,
        error: error.message,
      });

      await step.run("cleanup-on-failure", async () => {
        const { generationId } = eventData;

        // Get generation record to find Blob URLs
        const [generation] = await db
          .select()
          .from(plushieGenerations)
          .where(eq(plushieGenerations.id, generationId));

        if (generation) {
          // Delete Blob storage if URLs exist (skip empty strings)
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
            console.error(
              "[Inngest] Failed to cleanup blob storage:",
              cleanupError
            );
          }

          // Update generation status to failed
          await db
            .update(plushieGenerations)
            .set({
              status: "failed",
              updatedAt: new Date(),
            })
            .where(eq(plushieGenerations.id, generationId));
        }
      });
    },
  },
  { event: "plushie/generate.requested" },
  async ({ event, step }) => {
    const { generationId, userId, imageData, imageType } = event.data;

    console.log("[Inngest] Generation started", { generationId, userId });

    // Step 1: Upload original image to Vercel Blob
    const originalImageUrl = await step.run("upload-original-image", async () => {
      console.log("[Inngest] Uploading original image");

      // Convert base64 to Buffer
      const base64Data = imageData.split(",")[1] || imageData;
      const buffer = Buffer.from(base64Data, "base64");

      // Determine file extension from MIME type
      const extension = imageType.split("/")[1] || "jpg";

      // Upload to Vercel Blob
      const blob = await put(
        `plushify/originals/${userId}/${generationId}.${extension}`,
        buffer,
        {
          access: "public",
          contentType: imageType,
        }
      );

      console.log("[Inngest] Original image uploaded", { url: blob.url });

      // Update database with original image URL
      await db
        .update(plushieGenerations)
        .set({ originalImageUrl: blob.url })
        .where(eq(plushieGenerations.id, generationId));

      return blob.url;
    });

    // Step 2: AI Analysis - Analyze image using Gemini vision model
    const analysisResult = await step.run("analyze-image-with-ai", async () => {
      console.log("[Inngest] Analyzing image with Gemini vision");

      const imageDataUrl = imageData.startsWith("data:")
        ? imageData
        : `data:${imageType};base64,${imageData}`;

      const result = await generateText({
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

      console.log("[Inngest] Analysis completed", {
        textLength: result.text.length,
      });

      return result.text;
    });

    // Step 3: AI Generation and Upload - Generate plushified image and upload to Blob
    // Combined into single step to avoid returning large binary data between steps
    const plushieImageUrl = await step.run("generate-and-upload-plushie", async () => {
        console.log("[Inngest] Generating plushified image");

        const generationPrompt = `Create a cute, adorable plushified version of the following subject.
Transform it into a soft, cuddly plush toy with:
- Exaggerated cute features (big eyes, round shapes)
- Soft, huggable appearance
- Simplified but recognizable design
- Warm, inviting colors
- Professional plush toy quality

Subject Analysis:
${analysisResult}

Make it look like a high-quality, professionally manufactured plush toy that someone would want to cuddle.`;

        const imageDataUrl = imageData.startsWith("data:")
          ? imageData
          : `data:${imageType};base64,${imageData}`;

        const result = await generateText({
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

        // Extract generated image from AI SDK response
        const files = result.files || [];
        const imageFile = files.find((file) =>
          file.mediaType?.startsWith("image/")
        );

        if (!imageFile) {
          console.error("[Inngest] No image file found in response");
          throw new NonRetriableError("No image generated by AI model");
        }

        console.log("[Inngest] Plushie image generated", {
          mediaType: imageFile.mediaType,
          size: imageFile.uint8Array.length,
        });

        // IMPORTANT: Upload immediately within the same step to avoid
        // returning large binary data (exceeds 4MB step output limit)
        console.log("[Inngest] Uploading generated plushie image");

        const buffer = Buffer.from(imageFile.uint8Array);

        const blob = await put(
          `plushify/generated/${userId}/${generationId}.png`,
          buffer,
          {
            access: "public",
            contentType: "image/png",
          }
        );

        console.log("[Inngest] Generated image uploaded", { url: blob.url });

        // Update database with generated image URL
        await db
          .update(plushieGenerations)
          .set({ plushieImageUrl: blob.url })
          .where(eq(plushieGenerations.id, generationId));

        return blob.url;
      }
    );

    // Step 4: Finalize - Deduct credit and mark as completed
    await step.run("finalize-and-deduct-credit", async () => {
      console.log("[Inngest] Finalizing generation");

      // Extract subject type from analysis with robust parsing
      let subjectType: "person" | "pet" | "other" = "other";
      const analysisText = String(analysisResult).toLowerCase();

      // Try multiple patterns to extract subject type
      if (analysisText.includes("subject type: person") ||
          analysisText.includes("person") && (analysisText.includes("human") || analysisText.includes("face"))) {
        subjectType = "person";
      } else if (analysisText.includes("subject type: pet") ||
                 analysisText.includes("dog") || analysisText.includes("cat") ||
                 analysisText.includes("animal") || analysisText.includes("pet")) {
        subjectType = "pet";
      }

      console.log("[Inngest] Detected subject type:", subjectType);

      // Atomic credit deduction with transaction tracking
      await db.transaction(async (tx) => {
        // Deduct credit from user
        const creditResult = await tx
          .update(user)
          .set({ credits: sql`${user.credits} - 1` })
          .where(and(eq(user.id, userId), gte(user.credits, 1)))
          .returning();

        if (creditResult.length === 0) {
          throw new NonRetriableError(
            "Credit deduction failed. Insufficient credits."
          );
        }

        const updatedUser = creditResult[0];

        // Record credit transaction
        await tx.insert(creditTransactions).values({
          userId,
          type: "generation",
          amount: -1,
          balanceAfter: updatedUser.credits,
          relatedId: generationId,
          description: "Plushie generation completed",
          metadata: {
            generationId,
            subjectType,
          },
        });

        // Update generation status to completed
        await tx
          .update(plushieGenerations)
          .set({
            status: "completed",
            subjectType,
            updatedAt: new Date(),
          })
          .where(eq(plushieGenerations.id, generationId));

        console.log("[Inngest] Generation completed successfully", {
          generationId,
          creditsRemaining: updatedUser.credits,
        });
      });
    });

    return {
      generationId,
      originalImageUrl,
      plushieImageUrl,
    };
  }
);
