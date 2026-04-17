"use client";

import { ErrorFallback } from "@/components/layout/error-fallback";

/**
 * Route-level error boundary for `/search`. Keeps the header and footer
 * mounted so users can still navigate away without a full reload.
 */
export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      title="We couldn't run that search."
      description="Something went wrong talking to the articles API. Try again or head back home."
      error={error}
      reset={reset}
    />
  );
}
