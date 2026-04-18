import { SubscribeButton } from "@/components/article/subscribe-button";
import { SubscribeForm } from "@/components/subscription/subscribe-form";
import { getSubscription } from "@/utilities/subscription";

/**
 * Paywall CTA. Doubles as the visual "unlock" below the faded teaser in
 * `ArticleBody` — the negative top margin pulls the banner flush under the
 * fade so the gradient reads as a single unit with this banner. For
 * subscribers, this component is a no-op (returns null) so subscribed readers
 * see the article uninterrupted.
 *
 * Must be awaited inside a Suspense boundary on the article route because
 * `getSubscription()` reads cookies under `cacheComponents`.
 */
export const SubscribeCTA: React.FC = async () => {
  const { isSubscribed } = await getSubscription();

  if (isSubscribed) {
    return null;
  }

  return (
    <aside className="-mt-8 border-y border-border bg-foreground text-background">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-12 text-center sm:px-10">
        <span className="font-eyebrow text-background/70">Subscribe</span>
        <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          Keep reading with a Vercel Daily subscription.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-background/80">
          Unlock the full article plus every changelog release, engineering
          deep-dive, and customer story we publish.
        </p>
        <SubscribeForm ariaLabel="Subscribe to read the rest of this article">
          <SubscribeButton
            label="Subscribe to Vercel Daily"
            className="font-eyebrow inline-flex h-10 items-center justify-center rounded-md bg-background px-5 text-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background disabled:opacity-60"
          />
        </SubscribeForm>
      </div>
    </aside>
  );
};
