import { requireEnv } from "@/utilities/require-env";

/** Base URL for the Vercel Daily News API (hoisted static config). */
const API_BASE = requireEnv("API_BASE");
const PROTECTION_BYPASS = requireEnv("VERCEL_DAILY_NEWS_BYPASS");

export type ApiErrorBody = unknown;

/** Non-2xx HTTP response from the API. */
export class ApiResponseError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body: ApiErrorBody;

  constructor(
    message: string,
    init: { status: number; statusText: string; body: ApiErrorBody },
  ) {
    super(message);
    this.name = "ApiResponseError";
    this.status = init.status;
    this.statusText = init.statusText;
    this.body = init.body;
  }
}

/** Network failure, DNS, or other fetch-level errors. */
export class ApiNetworkError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ApiNetworkError";
  }
}

function parseJsonLenient(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Typed fetch helper for the news API. Checks `response.ok`, merges headers with
 * the deployment protection bypass, and throws typed errors on failure.
 *
 * @param endpoint - Path under `/api/` (leading slashes are ignored).
 */
export async function api<T = unknown>(
  endpoint: string,
  init: RequestInit = {},
): Promise<T> {
  const path = endpoint.replace(/^\/+/, "");
  const url = `${API_BASE}/${path}`;

  const headers = new Headers(init.headers);
  headers.set("x-vercel-protection-bypass", PROTECTION_BYPASS);

  let res: Response;
  try {
    res = await fetch(url, { ...init, headers });
  } catch (cause) {
    throw new ApiNetworkError(`Network request failed: ${url}`, { cause });
  }

  const text = await res.text();

  if (!res.ok) {
    throw new ApiResponseError(`API error ${res.status} ${res.statusText}`, {
      status: res.status,
      statusText: res.statusText,
      body: text ? parseJsonLenient(text) : undefined,
    });
  }

  if (!text) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch (cause) {
    throw new Error(`Invalid JSON in successful response from ${url}`, {
      cause,
    });
  }
}
