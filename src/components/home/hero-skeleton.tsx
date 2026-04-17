export const HeroSkeleton: React.FC = () => {
  return (
    <section
      aria-hidden
      className="border-b border-border bg-background lg:grid lg:grid-cols-[minmax(0,1fr)_50vw] lg:items-stretch lg:bg-card"
    >
      <div className="px-4 py-12 sm:px-10 lg:px-0 lg:py-20">
        <div className="flex flex-col gap-4 lg:ml-auto lg:max-w-[40rem] lg:py-8 lg:pl-10 lg:pr-16">
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
      </div>
      <div className="pb-12 lg:px-0 lg:py-20 lg:pl-0">
        <div className="aspect-[16/10] w-full animate-pulse bg-secondary lg:h-full lg:min-h-[30rem] lg:rounded-l-2xl lg:rounded-r-none lg:border lg:border-border lg:border-r-0 lg:bg-secondary lg:p-2" />
      </div>
    </section>
  );
};
