import { SubscribeButton } from "@/components/article/subscribe-button";
import { UnsubscribeButton } from "@/components/layout/unsubscribe-button";
import { SubscribeForm } from "@/components/subscription/subscribe-form";
import { UnsubscribeForm } from "@/components/subscription/unsubscribe-form";
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
  "font-eyebrow cursor-pointer relative inline-flex h-9 w-36 items-center justify-center rounded-full bg-foreground pl-8 pr-8 text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-60";

export const HeaderActions: React.FC = async () => {
  const { isSubscribed } = await getSubscription();

  if (isSubscribed) {
    return (
      <UnsubscribeForm ariaLabel="Cancel your Vercel Daily subscription">
        <UnsubscribeButton className={BUTTON_CLASS} showPendingIcon />
      </UnsubscribeForm>
    );
  }

  return (
    <SubscribeForm ariaLabel="Subscribe to Vercel Daily">
      <SubscribeButton className={BUTTON_CLASS} showPendingIcon />
    </SubscribeForm>
  );
};
