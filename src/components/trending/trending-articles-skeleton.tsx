import { ArticleCardSkeleton } from "@/components/article-card/article-card-skeleton";

const SKELETON_KEYS = ["a", "b", "c"] as const;

export const TrendingArticlesSkeleton: React.FC = () => {
  return (
    <section aria-hidden className="mx-auto max-w-7xl px-4 py-16 sm:px-10">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-secondary" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKELETON_KEYS.map((key) => (
          <ArticleCardSkeleton key={key} />
        ))}
      </div>
    </section>
  );
};
