"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { plushieGenerations } from "@/lib/schema";
import { headers } from "next/headers";
import { eq, sql, and } from "drizzle-orm";

/**
 * Server action to get the count of currently processing generations for the current user
 *
 * Used for client-side concurrency limit validation before generation submission
 *
 * @returns Processing count or error
 */
export async function getProcessingCount(): Promise<{
  success: boolean;
  count?: number;
  error?: string;
}> {
  try {
    // Authenticate user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Get count of processing generations
    const result = await db
      .select({
        count: sql<number>`COUNT(*)::int`,
      })
      .from(plushieGenerations)
      .where(
        and(
          eq(plushieGenerations.userId, userId),
          eq(plushieGenerations.status, "processing")
        )
      );

    const count = result[0]?.count || 0;

    return {
      success: true,
      count,
    };
  } catch (error) {
    console.error("[Get Processing Count] Error:", error);
    return {
      success: false,
      error: "Failed to check processing count",
    };
  }
}
