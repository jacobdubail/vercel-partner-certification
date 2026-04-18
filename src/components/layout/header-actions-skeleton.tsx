/**
 * Suspense fallback for `HeaderActions`. Matches the real button's footprint
 * (h-9, fixed width) so the header
 * doesn't jump when the subscription cookie resolves.
 */
export const HeaderActionsSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden
      className="h-9 w-36 animate-pulse rounded-full bg-secondary"
    />
  );
};
