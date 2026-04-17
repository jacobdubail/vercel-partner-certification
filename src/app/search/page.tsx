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

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: rawQ, category: rawCategory } = await searchParams;
  const q = (rawQ ?? "").trim();
  const category = (rawCategory ?? "").trim();

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
          <FilterForm defaultQ={q} defaultCategory={category} />
        </Suspense>
      </div>

      <Suspense key={`${q}|${category}`} fallback={<SearchResultsSkeleton />}>
        <SearchResults q={q} category={category} />
      </Suspense>
    </section>
  );
}
