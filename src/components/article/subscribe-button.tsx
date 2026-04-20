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
