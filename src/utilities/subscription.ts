import "server-only";
import { cookies } from "next/headers";
import { ApiResponseError, api } from "@/utilities/api";

export const SUBSCRIPTION_TOKEN_COOKIE = "vd_subscription_token";

export type SubscriptionStatus = "active" | "inactive";

export type SubscriptionRecord = {
  token: string;
  status: SubscriptionStatus;
  subscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type SubscriptionEnvelope = {
  success: true;
  data: SubscriptionRecord;
};

const NO_CACHE: RequestInit = { cache: "no-store" };

const tokenHeader = (token: string) => ({ "x-subscription-token": token });

/**
 * Thin wrappers around the Vercel Daily News subscription API. Each one
 * unwraps the `{ success, data }` envelope and returns the subscription
 * record directly. All requests are `no-store` because subscription state is
 * per-user and changes on demand via Server Actions — caching would return
 * the wrong status to the wrong visitor.
 */
export async function fetchSubscription(
  token: string,
): Promise<SubscriptionRecord> {
  const res = await api<SubscriptionEnvelope>("/subscription", {
    ...NO_CACHE,
    headers: tokenHeader(token),
  });
  return res.data;
}

export async function createSubscription(): Promise<SubscriptionRecord> {
  const res = await api<SubscriptionEnvelope>("/subscription/create", {
    ...NO_CACHE,
    method: "POST",
  });
  return res.data;
}

export async function activateSubscription(
  token: string,
): Promise<SubscriptionRecord> {
  const res = await api<SubscriptionEnvelope>("/subscription", {
    ...NO_CACHE,
    method: "POST",
    headers: tokenHeader(token),
  });
  return res.data;
}

export async function deactivateSubscription(
  token: string,
): Promise<SubscriptionRecord> {
  const res = await api<SubscriptionEnvelope>("/subscription", {
    ...NO_CACHE,
    method: "DELETE",
    headers: tokenHeader(token),
  });
  return res.data;
}

type SubscriptionState = {
  isSubscribed: boolean;
  token: string | null;
};

/**
 * Reads the subscription cookie and, if present, asks the API for the current
 * record. Returns a boolean + the token. A 404 from the API (subscription
 * deleted server-side, or stale token) is treated as "not subscribed" so the
 * UI can fall back to the guest state instead of crashing.
 *
 * Not cacheable — reads the cookie store, which is request-scoped. Must be
 * awaited inside a Suspense boundary under `cacheComponents`.
 */
export async function getSubscription(): Promise<SubscriptionState> {
  const store = await cookies();
  const token = store.get(SUBSCRIPTION_TOKEN_COOKIE)?.value ?? null;

  if (!token) {
    return { isSubscribed: false, token: null };
  }

  try {
    const record = await fetchSubscription(token);
    return { isSubscribed: record.status === "active", token };
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      return { isSubscribed: false, token: null };
    }
    throw error;
  }
}
