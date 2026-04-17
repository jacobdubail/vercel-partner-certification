export const ArticleCardSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-lg border border-border bg-card"
    >
      <div className="aspect-[16/9] w-full animate-pulse bg-secondary" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded-full bg-secondary" />
          <div className="h-3 w-20 animate-pulse rounded bg-secondary" />
        </div>
        <div className="h-5 w-4/5 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-full animate-pulse rounded bg-secondary" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  );
};
