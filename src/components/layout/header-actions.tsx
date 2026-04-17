/**
 * Placeholder for the subscription action slot in the header. Will be replaced
 * by a real Subscribe / Unsubscribe control once paywall + cookie session work
 * lands. Renders a non-interactive stub today so the header layout matches its
 * future shape and doesn't shift when subscription state arrives.
 */
export const HeaderActions: React.FC = () => {
  return (
    <button
      type="button"
      disabled
      aria-disabled
      title="Subscriptions coming soon"
      className="font-eyebrow inline-flex h-9 items-center justify-center rounded-md bg-foreground px-3 text-background opacity-60"
    >
      Subscribe
    </button>
  );
};
