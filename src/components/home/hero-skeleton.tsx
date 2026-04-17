export const HeroSkeleton: React.FC = () => {
  return (
    <section
      aria-hidden
      className="border-b border-border bg-card"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-10 lg:flex-row lg:items-center lg:gap-12 lg:py-20">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 animate-pulse rounded-full bg-secondary" />
            <div className="h-4 w-28 animate-pulse rounded bg-secondary" />
          </div>
          <div className="h-10 w-11/12 animate-pulse rounded bg-secondary" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-secondary" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-secondary" />
          </div>
          <div className="h-10 w-40 animate-pulse rounded-md bg-secondary" />
        </div>
        <div className="aspect-[16/10] w-full animate-pulse rounded-lg bg-secondary lg:flex-1" />
      </div>
    </section>
  );
};
