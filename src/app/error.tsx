"use client";

import { ErrorFallback } from "@/components/layout/error-fallback";

/**
 * Root error boundary. Catches render-time errors in `/` (homepage) and any
 * nested route that doesn't define its own `error.tsx`.
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      title="We hit a snag loading Vercel Daily."
      description="Refresh the page or head back home while we sort it out."
      error={error}
      reset={reset}
    />
  );
}
