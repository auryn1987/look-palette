"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export function NewsletterForm() {
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
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to subscribe right now.");
      }

      setStatus("success");
      setMessage(data.message ?? "Thanks for subscribing.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to subscribe right now.",
      );
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-full border border-white/15 bg-white/6 px-5 py-3 text-white placeholder:text-white/45 outline-none transition focus:border-white/40"
        />
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-white px-5 py-3 font-semibold text-[var(--color-ink)] transition hover:bg-white/90 disabled:opacity-70"
        >
          {status === "saving" ? "Submitting..." : "Subscribe"}
        </button>
      </div>
      {message ? (
        <p
          className={
            status === "error" ? "text-sm text-red-300" : "text-sm text-emerald-300"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
