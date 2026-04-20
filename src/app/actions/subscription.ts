"use server";

import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { ApiResponseError } from "@/utilities/api";
import {
  activateSubscription,
  cacheSubscriptionStatus,
  clearSubscriptionStatus,
  createSubscription,
  deactivateSubscription,
  SUBSCRIPTION_TOKEN_COOKIE,
} from "@/utilities/subscription";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
} as const;

export async function subscribe() {
  const store = await cookies();
  const existingToken = store.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;

  if (existingToken) {
    try {
      await activateSubscription(existingToken);
      cacheSubscriptionStatus(existingToken, true);
      refresh();
      return;
    } catch (error) {
      // Any error other than "token no longer exists" is a real failure.
      if (!(error instanceof ApiResponseError) || error.status !== 404) {
        throw error;
      }
      // 404 → stale token; mint a fresh one below.
    }
  }

  const record = await createSubscription();
  await activateSubscription(record.token);
  store.set(SUBSCRIPTION_TOKEN_COOKIE, record.token, COOKIE_OPTIONS);
  cacheSubscriptionStatus(record.token, true);
  refresh();
}

export async function unsubscribe() {
  const store = await cookies();
  const token = store.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;
  if (!token) {
    refresh();
    return;
  }

  try {
    await deactivateSubscription(token);
    cacheSubscriptionStatus(token, false);
    refresh();
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      store.delete(SUBSCRIPTION_TOKEN_COOKIE);
      clearSubscriptionStatus(token);
      refresh();
      return;
    }
    throw error;
  }
}
