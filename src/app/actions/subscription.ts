"use server";

import { cookies } from "next/headers";
import { ApiResponseError } from "@/utilities/api";
import {
  activateSubscription,
  createSubscription,
  deactivateSubscription,
  SUBSCRIPTION_TOKEN_COOKIE,
} from "@/utilities/subscription";

/**
 * Server Actions for the Vercel Daily News subscription API. The token is a
 * long-lived identifier stored in an `httpOnly` cookie — we keep it across
 * unsubscribes so a repeat visitor reactivates their existing subscription
 * instead of accumulating abandoned tokens.
 *
 * No `revalidatePath` / `revalidateTag` needed: the Server Action response
 * re-renders the current route automatically, and cached article data is
 * user-agnostic so the existing cache tags stay intact.
 */

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  // One year — the token is a stable handle; activation state lives server-side.
  maxAge: 60 * 60 * 24 * 365,
} as const;

export async function subscribe() {
  const store = await cookies();
  const existingToken = store.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;

  if (existingToken) {
    try {
      await activateSubscription(existingToken);
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
}

export async function unsubscribe() {
  const store = await cookies();
  const token = store.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;
  if (!token) return;

  try {
    await deactivateSubscription(token);
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      store.delete(SUBSCRIPTION_TOKEN_COOKIE);
      return;
    }
    throw error;
  }
}
