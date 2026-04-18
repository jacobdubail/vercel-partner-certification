"use client";

import type { ReactNode } from "react";
import { unsubscribe } from "@/app/actions/subscription";
import { useSubscriptionPending } from "@/components/subscription/subscription-pending-provider";

type UnsubscribeFormProps = {
  children: ReactNode;
  ariaLabel: string;
};

export const UnsubscribeForm: React.FC<UnsubscribeFormProps> = ({
  children,
  ariaLabel,
}) => {
  const { setPendingAction } = useSubscriptionPending();

  return (
    <form
      onSubmit={() => {
        setPendingAction("unsubscribe");
      }}
      action={async () => {
        try {
          await unsubscribe();
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
