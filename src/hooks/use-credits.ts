"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

/**
 * Custom hook to fetch and track user credits from the database.
 * Automatically refetches when the session changes.
 *
 * @returns Object containing credits count and loading state
 */
export function useCredits() {
  const { data: session, isPending: sessionPending } = useSession();
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCredits() {
      if (!session?.user) {
        setCredits(0);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch("/api/user/credits");

        if (!response.ok) {
          console.error("Failed to fetch credits:", response.statusText);
          setCredits(0);
          return;
        }

        const data = await response.json();
        setCredits(data.credits ?? 0);
      } catch (error) {
        console.error("Error fetching credits:", error);
        setCredits(0);
      } finally {
        setIsLoading(false);
      }
    }

    if (!sessionPending) {
      fetchCredits();
    }
  }, [session?.user, sessionPending]);

  return { credits, isLoading: isLoading || sessionPending };
}
