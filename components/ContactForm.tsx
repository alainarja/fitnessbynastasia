"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/copy";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          message: String(data.get("message") || ""),
          company: String(data.get("company") || ""),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[8px] border border-brown/15 bg-card p-8 text-center">
        <h3 className="text-2xl text-espresso">{contact.successTitle}</h3>
        <p className="mt-3 text-brown">{contact.successBody}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-[8px] border border-brown/25 bg-card px-4 py-3 text-base text-espresso outline-none transition-colors placeholder:text-brown/50 focus-visible:border-red min-h-[48px]";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="c-name" className="label-eyebrow mb-2 block text-brown">
          Name
        </label>
        <input id="c-name" name="name" type="text" required autoComplete="name" placeholder={contact.formName} className={inputClass} />
      </div>
      <div>
        <label htmlFor="c-email" className="label-eyebrow mb-2 block text-brown">
          Email
        </label>
        <input id="c-email" name="email" type="email" required autoComplete="email" placeholder={contact.formEmail} className={inputClass} />
      </div>
      <div>
        <label htmlFor="c-message" className="label-eyebrow mb-2 block text-brown">
          Message
        </label>
        <textarea id="c-message" name="message" required rows={5} placeholder={contact.formMessage} className={`${inputClass} resize-y`} />
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[8px] bg-red px-7 py-4 font-semibold text-card transition-colors hover:bg-maroon disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : contact.formButton}
      </button>

      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-red">
          {error}
        </p>
      ) : null}
    </form>
  );
}
