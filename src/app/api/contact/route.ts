import type { NextRequest } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 3;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
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

  const body = (await request.json()) as {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
  };

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const message = body.message?.trim() ?? "";

  if (!firstName || !lastName || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Invalid email format." }, { status: 400 });
  }

  if (firstName.length > 50 || lastName.length > 50) {
    return Response.json(
      { error: "Names must be 50 characters or less." },
      { status: 400 },
    );
  }

  if (message.length < 10 || message.length > 1000) {
    return Response.json(
      { error: "Message must be between 10 and 1000 characters." },
      { status: 400 },
    );
  }

  if (process.env.RESEND_API_KEY) {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? "Look Palette <noreply@lookpalette.com>",
        to: [process.env.CONTACT_TO_EMAIL ?? "contact@lookpalette.com"],
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return Response.json(
        { error: `Failed to send message: ${errorText}` },
        { status: 500 },
      );
    }
  } else {
    console.log("Contact submission received without RESEND_API_KEY:", {
      firstName,
      lastName,
      email,
      message,
    });
  }

  return Response.json({ message: "Message sent successfully." });
}
