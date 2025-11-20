"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { purchases } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Get purchase history for the current user.
 *
 * @param limit - Maximum number of purchases to return (default: 20)
 * @returns Success response with purchase data or error
 */
export async function getPurchases(limit: number = 20) {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    // Fetch purchases for current user
    const userPurchases = await db
      .select()
      .from(purchases)
      .where(eq(purchases.userId, session.user.id))
      .orderBy(desc(purchases.createdAt))
      .limit(limit);

    return {
      success: true,
      data: userPurchases,
    };
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return {
      success: false,
      error: "Failed to fetch purchases",
    };
  }
}
