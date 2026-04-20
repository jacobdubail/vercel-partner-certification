export const ArticleBodySkeleton: React.FC = () => {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      <div className="h-5 w-full animate-pulse rounded bg-secondary" />
      <div className="h-5 w-11/12 animate-pulse rounded bg-secondary" />
      <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
    </div>
  );
};
