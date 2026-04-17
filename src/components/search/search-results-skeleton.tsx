import { ArticleCardSkeleton } from "@/components/article-card/article-card-skeleton";

const SKELETON_COUNT = 6;

export const SearchResultsSkeleton: React.FC = () => {
  return (
    <div aria-hidden>
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div className="h-8 w-48 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-32 animate-pulse rounded bg-secondary" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
