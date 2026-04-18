export const HeroSkeleton: React.FC = () => {
  return (
    <section
      aria-hidden
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-10 lg:py-24">
        <div className="flex max-w-4xl flex-col gap-5">
          <div className="h-4 w-36 animate-pulse rounded bg-secondary" />
          <div className="h-12 w-11/12 animate-pulse rounded bg-secondary" />
          <div className="h-12 w-5/6 animate-pulse rounded bg-secondary" />
          <div className="flex flex-col gap-2">
            <div className="h-5 w-full animate-pulse rounded bg-secondary" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-secondary" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-11 w-40 animate-pulse rounded-full bg-secondary" />
            <div className="h-11 w-32 animate-pulse rounded-full bg-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};
