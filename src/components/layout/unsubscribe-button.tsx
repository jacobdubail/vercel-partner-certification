"use client";

import { useFormStatus } from "react-dom";

type UnsubscribeButtonProps = {
  className: string;
};

/**
 * Header-only companion to `SubscribeButton`. Kept in `layout/` because the
 * paywall CTA never unsubscribes — that flow only lives in the header.
 */
export const UnsubscribeButton: React.FC<UnsubscribeButtonProps> = ({
  className,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={className}
    >
      {pending ? "Unsubscribing…" : "Unsubscribe"}
    </button>
  );
};
