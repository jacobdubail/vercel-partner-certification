"use client";

import { ErrorFallback } from "@/components/layout/error-fallback";

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
