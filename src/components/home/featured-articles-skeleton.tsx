import { ArticleCardSkeleton } from "@/components/article-card/article-card-skeleton";

const SKELETON_COUNT = 6;

export const FeaturedArticlesSkeleton: React.FC = () => {
  return (
    <section
      aria-hidden
      className="mx-auto max-w-7xl px-4 py-16 sm:px-10"
    >
      <div className="mb-8 flex flex-col gap-2">
        <div className="h-8 w-64 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-80 animate-pulse rounded bg-secondary" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};
