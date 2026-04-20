import { SubscribeButton } from "@/components/article/subscribe-button";
import { UnsubscribeButton } from "@/components/layout/unsubscribe-button";
import { SubscribeForm } from "@/components/subscription/subscribe-form";
import { UnsubscribeForm } from "@/components/subscription/unsubscribe-form";
import { getSubscription } from "@/utilities/subscription";

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
