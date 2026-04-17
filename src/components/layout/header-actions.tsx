import { subscribe, unsubscribe } from "@/app/actions/subscription";
import { SubscribeButton } from "@/components/article/subscribe-button";
import { UnsubscribeButton } from "@/components/layout/unsubscribe-button";
import { getSubscription } from "@/utilities/subscription";

/**
 * Subscription indicator in the header. Flips between a Subscribe form and an
 * Unsubscribe form based on the cookie. Intentionally does not use a badge —
 * per the exercise spec, the header shows an actionable toggle so the user can
 * exit their subscribed state with one click.
 *
 * Must be awaited inside a Suspense boundary in `Header` because
 * `getSubscription()` reads cookies under `cacheComponents`.
 */
const BUTTON_CLASS =
  "font-eyebrow inline-flex h-9 items-center justify-center rounded-md bg-foreground px-3 text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-60";

/* TODO: Consider useOptimistic 
 * Optimistic update for the button and a loading state for the 
 * article body would be nice. The current request roundtrips feel
 * a bit slow.
 */
export const HeaderActions: React.FC = async () => {
  const { isSubscribed } = await getSubscription();

  if (isSubscribed) {
    return (
      <form
        action={unsubscribe}
        aria-label="Cancel your Vercel Daily subscription"
      >
        <UnsubscribeButton className={BUTTON_CLASS} />
      </form>
    );
  }

  return (
    <form action={subscribe} aria-label="Subscribe to Vercel Daily">
      <SubscribeButton className={BUTTON_CLASS} />
    </form>
  );
};
