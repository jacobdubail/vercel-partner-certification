"use client";

import Link from "next/link";

type ErrorFallbackProps = {
  title: string;
  description: string;
  error: Error & { digest?: string };
  reset: () => void;
  homeHref?: string;
};

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title,
  description,
  error,
  reset,
  homeHref = "/",
}) => {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-24 sm:px-10">
      <span className="font-eyebrow rounded-full bg-secondary px-3 py-1 text-foreground">
        Something went wrong
      </span>
      <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
      {error.digest ? (
        <p className="text-sm text-muted-foreground">
          Error reference:{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-foreground">
            {error.digest}
          </code>
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={reset}
          className="font-eyebrow inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Try again
        </button>
        <Link
          href={{ pathname: homeHref }}
          className="font-eyebrow inline-flex h-10 items-center justify-center rounded-md border border-border px-5 text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
};
