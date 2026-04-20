import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Vercel Daily",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-24 sm:px-10">
      <span className="font-eyebrow rounded-full bg-secondary px-3 py-1 text-foreground">
        404
      </span>
      <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
        This page got lost in the changelog.
      </h1>
      <p className="text-lg leading-relaxed text-muted-foreground">
        The article or page you're looking for may have been moved, renamed, or
        never existed. Head back home or try searching for what you need.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href={{ pathname: "/" }}
          className="font-eyebrow inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Back to home
        </Link>
        <Link
          href={{ pathname: "/search" }}
          className="font-eyebrow inline-flex h-10 items-center justify-center rounded-md border border-border px-5 text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Search articles
        </Link>
      </div>
    </section>
  );
}
