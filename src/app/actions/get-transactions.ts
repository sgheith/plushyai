"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { creditTransactions } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Get credit transaction history for the current user.
 *
 * @param limit - Maximum number of transactions to return (default: 50)
 * @returns Success response with transaction data or error
 */
export async function getTransactions(limit: number = 50) {
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
    // Fetch transactions for current user
    const transactions = await db
      .select()
      .from(creditTransactions)
      .where(eq(creditTransactions.userId, session.user.id))
      .orderBy(desc(creditTransactions.createdAt))
      .limit(limit);

    return {
      success: true,
      data: transactions,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      success: false,
      error: "Failed to fetch transactions",
    };
  }
}
