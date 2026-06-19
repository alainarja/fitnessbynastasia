"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Props = {
  /** "stacked" for the hero form, "inline" for footer / compact bars. */
  variant?: "stacked" | "inline";
  tone?: "light" | "dark";
  source?: string; // tag for the email tool, e.g. "shift-hero"
  showName?: boolean;
  buttonLabel?: string;
  reassurance?: string;
  /** If set, redirect here on success. Otherwise show an inline success state. */
  redirectTo?: string;
  className?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({
  variant = "stacked",
  tone = "dark",
  source = "shift-guide",
  showName = true,
  buttonLabel = "Send me the guide",
  reassurance = "No spam. Unsubscribe anytime.",
  redirectTo = "/shift/thank-you",
  className = "",
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onLight = tone === "light";
  const inputBase =
    "w-full rounded-[8px] border px-4 py-3 text-base outline-none transition-colors min-h-[48px] focus-visible:border-red";
  const inputSkin = onLight
    ? "border-cream/30 bg-cream/10 text-cream placeholder:text-cream/50"
    : "border-brown/25 bg-card text-espresso placeholder:text-brown/50";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: String(data.get("email") || ""),
      firstName: String(data.get("firstName") || ""),
      company: String(data.get("company") || ""), // honeypot
      source,
    };

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Something went wrong. Please try again.");
      }

      if (redirectTo) {
        router.push(redirectTo);
        return; // keep the submitting state through navigation
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className={`rounded-[8px] px-4 py-3 text-sm font-medium ${onLight ? "bg-cream/15 text-cream" : "bg-card text-espresso"} ${className}`}>
        You are in. Check your inbox for the guide.
      </p>
    );
  }

  const submitting = status === "submitting";
  const layout = variant === "inline" ? "sm:flex sm:items-start sm:gap-3" : "space-y-3";

  return (
    <form onSubmit={handleSubmit} noValidate className={className} aria-label="Email opt in">
      <div className={layout}>
        {showName ? (
          <div className={variant === "inline" ? "mb-3 sm:mb-0 sm:flex-1" : ""}>
            <label htmlFor={`fn-${source}`} className="sr-only">
              First name
            </label>
            <input
              id={`fn-${source}`}
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First name (optional)"
              className={`${inputBase} ${inputSkin}`}
            />
          </div>
        ) : null}

        <div className={variant === "inline" ? "mb-3 sm:mb-0 sm:flex-1" : ""}>
          <label htmlFor={`em-${source}`} className="sr-only">
            Email address
          </label>
          <input
            id={`em-${source}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            className={`${inputBase} ${inputSkin}`}
          />
        </div>

        {/* Honeypot: hidden from humans, tempting to bots. */}
        <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`co-${source}`}>Company</label>
          <input id={`co-${source}`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-red px-6 py-3 font-semibold text-card transition-colors hover:bg-maroon disabled:opacity-70 ${
            variant === "inline" ? "sm:w-auto sm:shrink-0" : ""
          }`}
        >
          {submitting ? "Sending..." : buttonLabel}
        </button>
      </div>

      {reassurance ? (
        <p className={`mt-3 text-xs ${onLight ? "text-cream/60" : "text-brown/70"}`}>{reassurance}</p>
      ) : null}

      {status === "error" ? (
        <p role="alert" className="mt-2 text-sm font-medium text-red">
          {error}
        </p>
      ) : null}
    </form>
  );
}
