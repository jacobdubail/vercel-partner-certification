export const ArticleSkeleton: React.FC = () => {
  return (
    <div aria-hidden className="mx-auto max-w-3xl px-4 py-12 sm:px-10">
      <div className="flex flex-col gap-5">
        <div className="h-7 w-28 animate-pulse rounded-full bg-secondary" />
        <div className="h-12 w-full animate-pulse rounded bg-secondary" />
        <div className="h-12 w-4/5 animate-pulse rounded bg-secondary" />
        <div className="h-5 w-full animate-pulse rounded bg-secondary" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="flex items-center gap-3 border-t border-border pt-4">
          <div className="h-4 w-32 animate-pulse rounded bg-secondary" />
          <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
        </div>
      </div>

      <div className="mt-8 aspect-[16/9] w-full animate-pulse rounded-lg bg-secondary" />

      <div className="mt-12 flex flex-col gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="h-5 w-full animate-pulse rounded bg-secondary" />
            <div className="h-5 w-11/12 animate-pulse rounded bg-secondary" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
          </div>
        ))}
      </div>
    </div>
  );
};
