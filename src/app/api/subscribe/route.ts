import type { NextRequest } from "next/server";
import { ConvexError } from "convex/values";
import { api } from "../../../../convex/_generated/api";
import {
  getConvexErrorMessage,
  isConvexConfigured,
  logConvexError,
  runMutation,
} from "@/lib/convex-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  rateLimitStore.set(ip, record);
  return true;
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (!checkRateLimit(clientIp)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  if (!isConvexConfigured()) {
    return Response.json(
      { error: "Waitlist is not available yet. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const result = await runMutation(api.waitlist.subscribe, {
      email: body.email ?? "",
      source: body.source ?? "unknown",
    });

    return Response.json({
      alreadySubscribed: result.alreadySubscribed,
      message: result.alreadySubscribed
        ? "You're already on the early access list."
        : "You're on the early access list.",
    });
  } catch (error) {
    if (error instanceof ConvexError) {
      return Response.json(
        {
          error: getConvexErrorMessage(
            error,
            "Unable to join the list right now.",
          ),
        },
        { status: 400 },
      );
    }

    logConvexError("Waitlist signup failed:", error);
    return Response.json(
      {
        error: getConvexErrorMessage(
          error,
          "Unable to join the list right now.",
        ),
      },
      { status: 500 },
    );
  }
}
