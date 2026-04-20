"use client";

import { ErrorFallback } from "@/components/layout/error-fallback";

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
