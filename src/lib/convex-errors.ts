import { ConvexError } from "convex/values";

export function getConvexErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ConvexError) {
    return typeof error.data === "string" ? error.data : fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function isConvexConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);
}
