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
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "4rem 1.5rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
          color: "#171717",
          background: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <main
          style={{
            maxWidth: "40rem",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", margin: 0, lineHeight: 1.2 }}>
            Something went wrong.
          </h1>
          <p style={{ margin: 0, color: "#52525b", lineHeight: 1.6 }}>
            Vercel Daily ran into an unexpected error and couldn't render. Try
            reloading the page — the issue may be temporary.
          </p>
          {error.digest ? (
            <p style={{ margin: 0, color: "#71717a", fontSize: "0.875rem" }}>
              Error reference: <code>{error.digest}</code>
            </p>
          ) : null}
          <div>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#171717",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.375rem",
                padding: "0.625rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
