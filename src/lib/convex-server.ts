import { ConvexHttpClient } from "convex/browser";
import type { FunctionReference, FunctionReturnType } from "convex/server";
import { ConvexError } from "convex/values";

function normalizeConvexUrl(url: string | undefined) {
  const normalized = url?.trim().replace(/\/+$/, "");
  return normalized || null;
}

export function getConvexUrl() {
  // On Vercel, only use the private production URL. Never fall back to
  // NEXT_PUBLIC_CONVEX_URL, which often still points at local Convex.
  if (process.env.VERCEL) {
    return normalizeConvexUrl(
      process.env.CONVEX_PROD_URL ?? process.env.CONVEX_URL,
    );
  }

  return normalizeConvexUrl(
    process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL,
  );
}

export function isConvexConfigured() {
  return Boolean(getConvexUrl());
}

export function getConvexErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ConvexError) {
    return typeof error.data === "string" ? error.data : fallback;
  }

  if (error instanceof Error) {
    const cause =
      error.cause instanceof Error && error.cause.message
        ? error.cause.message
        : undefined;
    const message = [error.message, cause].filter(Boolean).join(": ");
    if (message) {
      return message;
    }
  }

  return fallback;
}

export function logConvexError(label: string, error: unknown) {
  const url = getConvexUrl();
  let host = "unset";

  try {
    host = url ? new URL(url).host : "unset";
  } catch {
    host = "invalid";
  }

  console.error(label, {
    name: error instanceof Error ? error.name : typeof error,
    message: error instanceof Error ? error.message : String(error),
    cause:
      error instanceof Error && error.cause instanceof Error
        ? error.cause.message
        : undefined,
    convexHost: host,
  });
}

function assertUsableConvexUrl(url: string) {
  if (
    process.env.VERCEL &&
    (url.includes("127.0.0.1") || url.includes("localhost"))
  ) {
    throw new Error(
      "Convex is pointed at a local deployment. Set CONVEX_PROD_URL to the production URL ending in .convex.cloud.",
    );
  }
}

export async function runMutation<Mutation extends FunctionReference<"mutation">>(
  mutation: Mutation,
  args: Mutation["_args"],
): Promise<FunctionReturnType<Mutation>> {
  const url = getConvexUrl();

  if (!url) {
    throw new Error("Convex is not configured.");
  }

  assertUsableConvexUrl(url);

  const client = new ConvexHttpClient(url);
  return client.mutation(mutation, args, { skipQueue: true });
}
