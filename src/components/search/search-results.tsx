import { ArticleCard } from "@/components/article-card/article-card";
import { getArticles, type CategorySlug } from "@/utilities/articles";

type SearchResultsProps = {
  q: string;
  category: string;
};

const KNOWN_CATEGORIES: CategorySlug[] = [
  "changelog",
  "engineering",
  "customers",
  "company-news",
  "community",
];

function isKnownCategory(value: string): value is CategorySlug {
  return (KNOWN_CATEGORIES as string[]).includes(value);
}

export const SearchResults: React.FC<SearchResultsProps> = async ({
  q,
  category,
}) => {
  const hasQuery = q.length > 0 || category.length > 0;
  const safeCategory = isKnownCategory(category) ? category : undefined;

  const response = await getArticles({
    search: q || undefined,
    category: safeCategory,
    limit: hasQuery ? 5 : 6,
  });

  const articles = response.data;
  const heading = hasQuery
    ? articles.length === 0
      ? "No results"
      : "Results"
    : "Recent articles";

  return (
    <section aria-labelledby="search-results-heading">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2
          id="search-results-heading"
          className="font-serif text-2xl font-semibold tracking-tight text-foreground"
        >
          {heading}
        </h2>
        {hasQuery && articles.length > 0 ? (
          <p
            role="status"
            aria-live="polite"
            className="text-sm text-muted-foreground"
          >
            Showing {articles.length} of {response.meta.pagination.total}
          </p>
        ) : null}
      </div>

      {articles.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center"
        >
          <p className="text-sm font-medium text-foreground">
            No articles match your search.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or clear the category filter.
          </p>
        </div>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
