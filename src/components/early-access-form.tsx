"use client";

import type { FormEvent } from "react";
import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function EarlyAccessForm({
  buttonLabel = "Join Early Access",
  placeholder = "Enter your email",
  theme = "dark",
  source = "site",
}: {
  buttonLabel?: string;
  placeholder?: string;
  theme?: "dark" | "light";
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await response.json()) as {
        alreadySubscribed?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to join the list right now.");
      }

      setStatus("success");
      setMessage(data.message ?? "You are on the early access list.");
      setEmail("");

      if (!data.alreadySubscribed && typeof window.gtag === "function") {
        window.gtag("event", "early_access_signup");
      }

      if (!data.alreadySubscribed && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to join the list right now.",
      );
    }
  }

  const isDark = theme === "dark";

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          className={
            isDark
              ? "w-full rounded-full border border-white/15 bg-white/6 px-5 py-3 text-white placeholder:text-white/45 outline-none transition focus:border-white/40"
              : "w-full rounded-full border border-stone-300 bg-white px-5 py-3 text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-[var(--color-ink)]"
          }
        />
        <button
          type="submit"
          disabled={status === "saving"}
          className={
            isDark
              ? "whitespace-nowrap rounded-full bg-white px-5 py-3 font-semibold text-[var(--color-ink)] transition hover:bg-white/90 disabled:opacity-70"
              : "whitespace-nowrap rounded-full bg-black px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
          }
        >
          {status === "saving" ? "Submitting..." : buttonLabel}
        </button>
      </div>
      {message ? (
        <p
          className={
            status === "error"
              ? isDark
                ? "text-sm text-red-300"
                : "text-sm text-red-600"
              : isDark
                ? "text-sm text-emerald-300"
                : "text-sm text-emerald-700"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
