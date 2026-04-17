"use client";

import { useFormStatus } from "react-dom";

type SubscribeButtonProps = {
  className: string;
  label?: string;
  pendingLabel?: string;
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
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={className}
    >
      {pending ? pendingLabel : label}
    </button>
  );
};
