import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
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

type CachedSubscriptionStatus = {
  isSubscribed: boolean;
  expiresAt: number;
};

const SUBSCRIPTION_CACHE_TTL_MS = 1000 * 60 * 5;
const subscriptionStatusCache = new Map<string, CachedSubscriptionStatus>();

function getCachedSubscriptionStatus(token: string): boolean | null {
  const entry = subscriptionStatusCache.get(token);

  if (!entry) {
    return null;
  }

  if (entry.expiresAt <= Date.now()) {
    subscriptionStatusCache.delete(token);
    return null;
  }

  return entry.isSubscribed;
}

export function cacheSubscriptionStatus(
  token: string,
  isSubscribed: boolean,
  ttlMs: number = SUBSCRIPTION_CACHE_TTL_MS,
) {
  subscriptionStatusCache.set(token, {
    isSubscribed,
    expiresAt: Date.now() + ttlMs,
  });
}

export function clearSubscriptionStatus(token: string) {
  subscriptionStatusCache.delete(token);
}

/**
 * Reads the subscription token cookie and returns a boolean + token. The fast
 * path is an in-memory process cache keyed by token; if it misses, we ask the
 * subscription API and repopulate the cache. This avoids duplicate browser
 * cookies while still speeding up repeated article renders on a warm server.
 *
 * Memoized per request with `React.cache()` so Header, ArticleBody, and
 * SubscribeCTA can all share the same cookies/API lookup during a single
 * render. This is request-scoped deduplication, not cross-user caching.
 */
const getSubscriptionState = cache(async (): Promise<SubscriptionState> => {
  const store = await cookies();
  const token = store.get(SUBSCRIPTION_TOKEN_COOKIE)?.value ?? null;

  if (!token) {
    return { isSubscribed: false, token: null };
  }

  const cachedStatus = getCachedSubscriptionStatus(token);
  if (cachedStatus !== null) {
    return { isSubscribed: cachedStatus, token };
  }

  try {
    const record = await fetchSubscription(token);
    const isSubscribed = record.status === "active";
    cacheSubscriptionStatus(token, isSubscribed);
    return { isSubscribed, token };
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      clearSubscriptionStatus(token);
      return { isSubscribed: false, token: null };
    }
    throw error;
  }
});

export async function getSubscription(): Promise<SubscriptionState> {
  return getSubscriptionState();
}

/**
 * Starts the per-request subscription lookup early so downstream server
 * components can await an already-running promise.
 */
export function preloadSubscription() {
  void getSubscriptionState();
}
