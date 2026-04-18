"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SubscriptionPendingAction = "subscribe" | "unsubscribe" | null;

type SubscriptionPendingContextValue = {
  pendingAction: SubscriptionPendingAction;
  setPendingAction: (action: SubscriptionPendingAction) => void;
};

const SubscriptionPendingContext =
  createContext<SubscriptionPendingContextValue | null>(null);

type SubscriptionPendingProviderProps = {
  children: ReactNode;
};

export const SubscriptionPendingProvider: React.FC<
  SubscriptionPendingProviderProps
> = ({ children }) => {
  const [pendingAction, setPendingAction] =
    useState<SubscriptionPendingAction>(null);

  const value = useMemo(
    () => ({ pendingAction, setPendingAction }),
    [pendingAction],
  );

  return (
    <SubscriptionPendingContext.Provider value={value}>
      {children}
    </SubscriptionPendingContext.Provider>
  );
};

export function useSubscriptionPending() {
  const context = useContext(SubscriptionPendingContext);

  if (!context) {
    throw new Error(
      "useSubscriptionPending must be used within SubscriptionPendingProvider",
    );
  }

  return context;
}
