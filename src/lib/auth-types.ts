import { Session } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";

/**
 * Extended user type that includes custom fields defined in Better Auth configuration.
 *
 * Custom Fields:
 * - credits: Number of credits available to the user (default: 0)
 * - platformRole: User's role in the platform (default: "user", can be "admin")
 */
export type UserWithCustomFields = Session["user"] & {
  credits: number;
  platformRole: "user" | "admin";
};

/**
 * Extended session type that includes custom user fields.
 *
 * Use this type when you need type-safe access to custom user fields
 * instead of manually casting session.user.
 *
 * @example
 * ```typescript
 * import { SessionWithCustomFields } from "@/lib/auth-types";
 *
 * const session = await auth.api.getSession({ headers: await headers() });
 * const typedSession = session as SessionWithCustomFields;
 *
 * // Now you have type-safe access to custom fields
 * const userCredits = typedSession.user.credits;
 * const isAdmin = typedSession.user.platformRole === "admin";
 * ```
 */
export type SessionWithCustomFields = Omit<Session, "user"> & {
  user: UserWithCustomFields;
};

/**
 * Type guard to check if a session has custom fields.
 * This is useful when you're not sure if the session is properly typed.
 *
 * @param session - The session to check
 * @returns True if the session has the expected custom fields
 */
export function hasCustomFields(session: Session): session is SessionWithCustomFields {
  const user = session.user as Partial<UserWithCustomFields>;
  return (
    typeof user.credits === "number" &&
    typeof user.platformRole === "string" &&
    (user.platformRole === "user" || user.platformRole === "admin")
  );
}

/**
 * Helper function to safely get user credits from a session.
 * Returns 0 if credits are not available.
 *
 * @param session - The session object
 * @returns The user's credit count (defaults to 0)
 */
export function getUserCredits(session: Session): number {
  const user = session.user as Partial<UserWithCustomFields>;
  return user.credits ?? 0;
}

/**
 * Helper function to check if a user is an admin.
 *
 * @param session - The session object
 * @returns True if the user has admin role
 */
export function isAdmin(session: Session): boolean {
  const user = session.user as Partial<UserWithCustomFields>;
  return user.platformRole === "admin";
}

/**
 * Fetches the full user data from the database by user ID.
 * This ensures you get the latest credit balance and other user fields.
 *
 * @param userId - The user ID from the session
 * @returns The user object with all fields, or null if not found
 */
export async function getUserFromDatabase(userId: string) {
  const [dbUser] = await db.select().from(user).where(eq(user.id, userId)).limit(1);
  return dbUser ?? null;
}
