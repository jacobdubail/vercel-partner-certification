"use client";

import type { ReactNode } from "react";
import { subscribe } from "@/app/actions/subscription";
import { useSubscriptionPending } from "@/components/subscription/subscription-pending-provider";

type SubscribeFormProps = {
  children: ReactNode;
  ariaLabel: string;
};

export const SubscribeForm: React.FC<SubscribeFormProps> = ({
  children,
  ariaLabel,
}) => {
  const { setPendingAction } = useSubscriptionPending();

  return (
    <form
      onSubmit={() => {
        setPendingAction("subscribe");
      }}
      action={async () => {
        try {
          await subscribe();
        } finally {
          setPendingAction(null);
        }
      }}
      aria-label={ariaLabel}
    >
      {children}
    </form>
  );
};
