"use client";

import { useRouter } from "next/navigation";
import { Suspense, use, useEffect, useRef } from "react";
import type { Category } from "@/utilities/articles";

type SearchFormProps = {
  categoriesPromise: Promise<Category[]>;
  defaultQ: string;
  defaultCategory: string;
};

const AUTO_SEARCH_DEBOUNCE_MS = 300;
const CONTROL_CLASS =
  "h-10 rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none focus:border-foreground/60 dark:bg-card";

function buildSearchHref(q: string, category: string): string {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

type CategorySelectProps = {
  categoriesPromise: Promise<Category[]>;
  defaultCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function CategorySelect({
  categoriesPromise,
  defaultCategory,
  handleCategoryChange,
}: CategorySelectProps) {
  const categories = use(categoriesPromise);

  return (
    <select
      id="search-category"
      name="category"
      defaultValue={defaultCategory}
      onChange={handleCategoryChange}
      className={CONTROL_CLASS}
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export const SearchForm: React.FC<SearchFormProps> = ({
  categoriesPromise,
  defaultQ,
  defaultCategory,
}) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancel any pending auto-search on unmount so we don't navigate after the
  // form is gone.
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const cancelPendingAutoSearch = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  };

  // Direct router.replace (no startTransition wrapper) so the SearchResults
  // Suspense boundary actually shows its skeleton fallback during navigation.
  // Wrapping in startTransition would keep the previous results visible until
  // the new data resolved — quiet, but the spec wants visible feedback.
  const navigate = (q: string, category: string) => {
    // @ts-expect-error typedRoutes does not statically type query strings
    router.replace(buildSearchHref(q.trim(), category), { scroll: false });
  };

  const handleSubmit = (formData: FormData) => {
    cancelPendingAutoSearch();
    const q = String(formData.get("q") ?? "");
    const category = String(formData.get("category") ?? "");
    navigate(q, category);
  };

  // Auto-submit when query is empty (clear) or has at least 3 chars, debounced
  // so we only fire after the user pauses typing for ~300ms instead of on
  // every keystroke.
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    if (q.length !== 0 && q.length < 3) {
      // Below threshold and not a clear — cancel any pending search and bail.
      cancelPendingAutoSearch();
      return;
    }

    cancelPendingAutoSearch();
    debounceRef.current = setTimeout(() => {
      const category = String(
        new FormData(formRef.current ?? undefined).get("category") ?? "",
      );
      navigate(q, category);
    }, AUTO_SEARCH_DEBOUNCE_MS);
  };

  // Category changes are explicit user intent, so they bypass the debounce.
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    cancelPendingAutoSearch();
    const category = event.target.value;
    const q = String(
      new FormData(formRef.current ?? undefined).get("q") ?? "",
    );
    navigate(q, category);
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      aria-label="Article search"
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1">
          <label
            htmlFor="search-q"
            className="font-eyebrow text-muted-foreground"
          >
            Search
          </label>
          <input
            id="search-q"
            name="q"
            type="search"
            defaultValue={defaultQ}
            autoComplete="off"
            aria-describedby="search-hint"
            onChange={handleQueryChange}
            className={CONTROL_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1 sm:w-56">
          <label
            htmlFor="search-category"
            className="font-eyebrow text-muted-foreground"
          >
            Category
          </label>
          <Suspense
            fallback={
              <select
                id="search-category"
                name="category"
                defaultValue={defaultCategory}
                disabled
                aria-disabled
                className={CONTROL_CLASS}
              >
                <option value="">
                  {defaultCategory ? "Loading category..." : "Loading categories..."}
                </option>
              </select>
            }
          >
            <CategorySelect
              categoriesPromise={categoriesPromise}
              defaultCategory={defaultCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </Suspense>
        </div>

        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Search
        </button>
      </div>

      <p id="search-hint" className="text-xs text-muted-foreground">
        Results update automatically after 3 characters, or press Enter.
      </p>
    </form>
  );
};
