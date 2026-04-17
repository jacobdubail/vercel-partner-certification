import type { Metadata } from "next";
import { Suspense } from "react";
import { FilterForm } from "@/components/search/filter-form";
import { SearchResults } from "@/components/search/search-results";
import { SearchResultsSkeleton } from "@/components/search/search-results-skeleton";

export const metadata: Metadata = {
  title: "Search | Vercel Daily",
  description:
    "Search the Vercel Daily archive by keyword and category to find articles, changelog entries, and engineering deep-dives.",
  openGraph: {
    title: "Search | Vercel Daily",
    description:
      "Search the Vercel Daily archive by keyword and category to find articles, changelog entries, and engineering deep-dives.",
    type: "website",
  },
};

type SearchParams = {
  q?: string;
  category?: string;
};

type SearchPageProps = {
  searchParams: Promise<SearchParams>;
};

function FilterFormSkeleton() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="h-10 flex-1 animate-pulse rounded-md bg-secondary" />
      <div className="h-10 sm:w-56 animate-pulse rounded-md bg-secondary" />
      <div className="h-10 w-24 animate-pulse rounded-md bg-secondary" />
    </div>
  );
}

/**
 * Thin async wrappers around each child of the Suspense boundaries below.
 * Awaiting `searchParams` at the page level would block prerendering the
 * whole route under `cacheComponents`; by moving the await into Suspense
 * leaves, the static shell (heading, layout, skeletons) streams immediately.
 */
async function FilterFormAsync({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q: rawQ, category: rawCategory } = await searchParams;
  return (
    <FilterForm
      defaultQ={(rawQ ?? "").trim()}
      defaultCategory={(rawCategory ?? "").trim()}
    />
  );
}

async function SearchResultsAsync({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q: rawQ, category: rawCategory } = await searchParams;
  return (
    <SearchResults
      q={(rawQ ?? "").trim()}
      category={(rawCategory ?? "").trim()}
    />
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <section className="mx-auto mb-20 max-w-7xl scroll-mt-24 px-4 py-10 sm:px-10">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Search
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Find articles by keyword or category. Searches start automatically
          after 3 characters.
        </p>
      </header>

      <div className="mb-10">
        <Suspense fallback={<FilterFormSkeleton />}>
          <FilterFormAsync searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResultsAsync searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
