import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { generatePlushieFunction } from "@/inngest/functions/generate-plushie";
import {
  handleGenerationFailureFunction,
  handleGenerationCancellationFunction,
} from "@/inngest/functions/handle-generation-failure";
import { processPurchase } from "@/inngest/functions/process-purchase";

/**
 * Inngest API route handler
 *
 * This route serves as the endpoint for Inngest to invoke registered functions.
 * During development, the Inngest Dev Server (http://localhost:8288) will call this endpoint.
 * In production, Inngest Cloud will call this endpoint to execute background jobs.
 *
 * Supported methods:
 * - GET: Inngest introspection (function registration discovery)
 * - POST: Function invocation
 * - PUT: Function invocation (alternative method)
 */
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generatePlushieFunction,
    handleGenerationFailureFunction,
    handleGenerationCancellationFunction,
    processPurchase,
  ],
});
