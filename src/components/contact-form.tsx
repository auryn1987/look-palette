"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

const MAX_MESSAGE_LENGTH = 1000;

interface ContactState {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const initialState: ContactState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send your message.");
      }

      setStatus("success");
      setMessage(data.message ?? "Thanks, your message has been sent.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to send your message.",
      );
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-stone-800">First name</span>
          <input
            name="firstName"
            value={form.firstName}
            onChange={updateField}
            required
            maxLength={50}
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
            placeholder="Enter your first name"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-stone-800">Last name</span>
          <input
            name="lastName"
            value={form.lastName}
            onChange={updateField}
            required
            maxLength={50}
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
            placeholder="Enter your last name"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-stone-800">Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={updateField}
          required
          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
          placeholder="Enter your email"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-stone-800">Message</span>
        <textarea
          name="message"
          rows={6}
          value={form.message}
          onChange={updateField}
          required
          maxLength={MAX_MESSAGE_LENGTH}
          className="w-full rounded-[1.5rem] border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
          placeholder="Tell us what you need help with."
        />
        <p className="text-right text-xs text-stone-500">
          {form.message.length}/{MAX_MESSAGE_LENGTH}
        </p>
      </label>

      {message ? (
        <p className={status === "error" ? "text-red-600" : "text-emerald-700"}>
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "saving"}
        className="inline-flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-full border border-black bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:!border-black hover:!bg-black hover:!text-white sm:w-auto"
      >
        {status === "saving" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
