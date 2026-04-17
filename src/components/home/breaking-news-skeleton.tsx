export const BreakingNewsSkeleton: React.FC = () => {
  return (
    <aside
      aria-hidden
      className="border-b border-border bg-foreground/90"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-10">
        <div className="h-5 w-20 animate-pulse rounded-full bg-background/30" />
        <div className="h-4 flex-1 animate-pulse rounded bg-background/20" />
      </div>
    </aside>
  );
};
