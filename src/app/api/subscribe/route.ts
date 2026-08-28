import type { NextRequest } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const subscribedEmails = new Set<string>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const body = (await request.json()) as { email?: string; source?: string };
  const email = body.email?.trim().toLowerCase() ?? "";

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Invalid email format." }, { status: 400 });
  }

  if (subscribedEmails.has(email)) {
    return Response.json(
      { error: "This email is already on the early access list." },
      { status: 400 },
    );
  }

  subscribedEmails.add(email);
  console.log("Early access signup captured:", { email, source: body.source ?? "unknown" });

  return Response.json({ message: "You're on the early access list." });
}
