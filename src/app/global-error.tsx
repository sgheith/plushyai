"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          fontFamily: "system-ui, sans-serif",
        }}>
          <div style={{
            maxWidth: "600px",
            width: "100%",
            padding: "2rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            textAlign: "center",
          }}>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}>
              Critical Error
            </h1>
            <p style={{
              color: "#6b7280",
              marginBottom: "2rem",
            }}>
              A critical error occurred. Please refresh the page to continue.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.75rem 2rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
