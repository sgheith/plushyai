"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Loader2 } from "lucide-react";
import { getTransactions } from "@/app/actions/get-transactions";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  balanceAfter: number;
  relatedId: string | null;
  description: string | null;
  metadata: unknown;
  createdAt: Date;
}

interface TransactionHistoryProps {
  limit?: number;
  className?: string;
}

/**
 * Component to display user's credit transaction history.
 * Shows purchases (credits added) and generations (credits spent).
 */
export function TransactionHistory({
  limit = 50,
  className,
}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getTransactions(limit);

        if (result.success && result.data) {
          setTransactions(result.data as Transaction[]);
        } else {
          setError(result.error || "Failed to load transactions");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, [limit]);

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get transaction type display name
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "purchase":
        return "Purchase";
      case "generation":
        return "Generation";
      case "refund":
        return "Refund";
      case "adjustment":
        return "Adjustment";
      default:
        return type;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Card className={cn("p-8", className)}>
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className={cn("p-8", className)}>
        <div className="text-center text-muted-foreground">
          <p>{error}</p>
        </div>
      </Card>
    );
  }

  // Empty state
  if (transactions.length === 0) {
    return (
      <Card className={cn("p-8", className)}>
        <div className="text-center text-muted-foreground">
          <p>No transactions yet.</p>
          <p className="text-sm mt-2">
            Purchase credits or create plushies to see your transaction
            history.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-6 border-b bg-muted/30">
        <h3 className="font-semibold">Transaction History</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your complete credit transaction log
        </p>
      </div>

      <div className="divide-y">
        {transactions.map((transaction) => {
          const isPositive = transaction.amount > 0;

          return (
            <div
              key={transaction.id}
              className="p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    "flex-shrink-0 rounded-full p-2",
                    isPositive ? "bg-green-500/10" : "bg-red-500/10"
                  )}
                >
                  {isPositive ? (
                    <ArrowUpCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">
                        {getTypeLabel(transaction.type)}
                      </p>
                      {transaction.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {transaction.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p
                        className={cn(
                          "font-semibold",
                          isPositive
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        )}
                      >
                        {isPositive ? "+" : ""}
                        {transaction.amount} credits
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Balance: {transaction.balanceAfter}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
