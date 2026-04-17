/**
 * Full-width subscribe call-to-action. Currently always renders since there is
 * no subscription state in the app yet — once cookie-backed sessions exist this
 * component will return null when the visitor is already subscribed. The button
 * is non-interactive today (paired with HeaderActions' Subscribe stub) and will
 * become a Server-Action-driven form in the paywall pass.
 */
export const SubscribeCTA: React.FC = () => {
  return (
    <aside className="border-y border-border bg-foreground text-background">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-12 text-center sm:px-10">
        <span className="font-eyebrow text-background/70">Subscribe</span>
        <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          Keep up with the platform powering modern apps.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-background/80">
          Vercel Daily delivers the latest changelog releases, engineering
          deep-dives, and customer stories straight to your reading list.
        </p>
        <button
          type="button"
          disabled
          aria-disabled
          title="Subscriptions coming soon"
          className="font-eyebrow inline-flex h-10 items-center justify-center rounded-md bg-background px-5 text-foreground opacity-80"
        >
          Subscribe to Vercel Daily
        </button>
      </div>
    </aside>
  );
};
