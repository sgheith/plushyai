import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, plushieGenerations } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

/**
 * GET /api/user/credits
 * Returns the current user's credit balance and processing count.
 * Available credits = total credits - processing count
 */
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Query credits and processing count in a single query
    const [creditData] = await db
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

    if (!creditData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const availableCredits = creditData.credits - creditData.processingCount;

    return NextResponse.json({
      credits: creditData.credits,
      processingCount: creditData.processingCount,
      availableCredits,
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
