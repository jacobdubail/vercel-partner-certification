"use client";

import { useFormStatus } from "react-dom";
import { useSubscriptionPending } from "@/components/subscription/subscription-pending-provider";
import { SubscriptionSpinnerIcon } from "@/components/subscription/subscription-spinner-icon";

type SubscribeButtonProps = {
  className: string;
  label?: string;
  pendingLabel?: string;
  showPendingIcon?: boolean;
};

/**
 * Submit button for any `<form action={subscribe}>`. Consolidates the pending
 * UX (label swap + aria-disabled) so the header and the paywall CTA stay in
 * sync. Styling is caller-supplied via `className` because the two call sites
 * sit on opposite backgrounds (light button on dark banner vs. dark button on
 * header chrome).
 */
export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  className,
  label = "Subscribe",
  pendingLabel = "Subscribing…",
  showPendingIcon = false,
}) => {
  const { pending } = useFormStatus();
  const { pendingAction } = useSubscriptionPending();
  const isPending = pending || pendingAction === "subscribe";
  const displayLabel = showPendingIcon ? label : isPending ? pendingLabel : label;

  return (
    <button
      type="submit"
      disabled={isPending}
      aria-disabled={isPending}
      className={className}
    >
      <span>{displayLabel}</span>
      {showPendingIcon ? (
        <span
          aria-hidden={!isPending}
          className="absolute right-3 inline-flex h-4 w-4 items-center justify-center"
        >
          {isPending ? <SubscriptionSpinnerIcon /> : null}
        </span>
      ) : null}
    </button>
  );
};
