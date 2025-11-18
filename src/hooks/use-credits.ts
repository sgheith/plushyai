"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

interface CreditData {
  credits: number;
  processingCount: number;
  availableCredits: number;
}

/**
 * Custom hook to fetch and track user credits from the database.
 * Automatically refetches when the session changes.
 *
 * @returns Object containing credits, processing count, available credits, and loading state
 */
export function useCredits() {
  const { data: session, isPending: sessionPending } = useSession();
  const [creditData, setCreditData] = useState<CreditData>({
    credits: 0,
    processingCount: 0,
    availableCredits: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCredits() {
      if (!session?.user) {
        setCreditData({
          credits: 0,
          processingCount: 0,
          availableCredits: 0,
        });
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch("/api/user/credits");

        if (!response.ok) {
          console.error("Failed to fetch credits:", response.statusText);
          setCreditData({
            credits: 0,
            processingCount: 0,
            availableCredits: 0,
          });
          return;
        }

        const data = await response.json();
        setCreditData({
          credits: data.credits ?? 0,
          processingCount: data.processingCount ?? 0,
          availableCredits: data.availableCredits ?? 0,
        });
      } catch (error) {
        console.error("Error fetching credits:", error);
        setCreditData({
          credits: 0,
          processingCount: 0,
          availableCredits: 0,
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (!sessionPending) {
      fetchCredits();
    }
  }, [session?.user, sessionPending]);

  return {
    credits: creditData.credits,
    processingCount: creditData.processingCount,
    availableCredits: creditData.availableCredits,
    isLoading: isLoading || sessionPending,
  };
}
