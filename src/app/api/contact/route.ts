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
const MAX_REQUESTS = 3;
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
      { error: "Contact form is not available yet. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      message?: string;
    };

    await runMutation(api.contact.submit, {
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      email: body.email ?? "",
      message: body.message ?? "",
    });

    return Response.json({ message: "Message sent successfully." });
  } catch (error) {
    if (error instanceof ConvexError) {
      return Response.json(
        {
          error: getConvexErrorMessage(error, "Unable to send your message."),
        },
        { status: 400 },
      );
    }

    logConvexError("Contact submission failed:", error);
    return Response.json(
      {
        error: getConvexErrorMessage(error, "Unable to send your message."),
      },
      { status: 500 },
    );
  }
}
