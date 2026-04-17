/**
 * Suspense fallback for `HeaderActions`. Matches the real button's footprint
 * (h-9, roughly the width of "Subscribe" in `font-eyebrow`) so the header
 * doesn't jump when the subscription cookie resolves.
 */
export const HeaderActionsSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden
      className="h-9 w-24 animate-pulse rounded-md bg-secondary"
    />
  );
};
