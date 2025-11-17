"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { plushieGenerations } from "@/lib/schema";
import { headers } from "next/headers";
import { eq, desc, count } from "drizzle-orm";

/**
 * Server action to fetch user's plushie generations with pagination
 *
 * @param page - Current page number (default: 1)
 * @param limit - Number of items per page (default: 12)
 * @returns Paginated generation data with metadata
 */
export async function getGenerations(
  page: number = 1,
  limit: number = 12
): Promise<{
  generations: Array<{
    id: string;
    originalImageUrl: string;
    plushieImageUrl: string;
    subjectType: string;
    status: string;
    createdAt: Date;
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  try {
    // 1. Authenticate user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized. Please sign in.");
    }

    const userId = session.user.id;

    // 2. Validate pagination parameters
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 50); // Max 50 items per page
    const offset = (validPage - 1) * validLimit;

    // 3. Get total count for pagination
    const [{ total }] = await db
      .select({ total: count() })
      .from(plushieGenerations)
      .where(eq(plushieGenerations.userId, userId));

    // 4. Fetch generations with pagination
    const generations = await db
      .select({
        id: plushieGenerations.id,
        originalImageUrl: plushieGenerations.originalImageUrl,
        plushieImageUrl: plushieGenerations.plushieImageUrl,
        subjectType: plushieGenerations.subjectType,
        status: plushieGenerations.status,
        createdAt: plushieGenerations.createdAt,
      })
      .from(plushieGenerations)
      .where(eq(plushieGenerations.userId, userId))
      .orderBy(desc(plushieGenerations.createdAt))
      .limit(validLimit)
      .offset(offset);

    // 5. Calculate pagination metadata
    const totalPages = Math.ceil(total / validLimit);

    return {
      generations,
      totalCount: total,
      totalPages,
      currentPage: validPage,
    };
  } catch (error) {
    console.error("Error fetching generations:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch generations"
    );
  }
}
