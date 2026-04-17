"use client";

import { ErrorFallback } from "@/components/layout/error-fallback";

/**
 * Route-level error boundary for `/articles/[param]`. `notFound()` is handled
 * separately by `not-found.tsx`; this catches actual render or fetch failures
 * (e.g. API outage) so the user sees a branded retry UI instead of a white
 * screen.
 */
export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      title="We couldn't load this article."
      description="It may be a temporary issue. Try again, or browse other articles from the homepage."
      error={error}
      reset={reset}
    />
  );
}
