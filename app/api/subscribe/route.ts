import type { NextRequest } from "next/server";
import { addSubscriber, sendGuideEmail, recordLead, sendLeadNotification } from "@/lib/leads";
import { isValidEmail, cleanString } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

/** Keep digits and a leading + so we can store a usable WhatsApp number. */
function cleanPhone(value: unknown): string {
  const s = cleanString(value, 32);
  const digits = s.replace(/[^\d+]/g, "");
  return digits.replace(/(?!^)\+/g, ""); // only a leading + allowed
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);
  const limited = rateLimit(`subscribe:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return Response.json({ ok: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: if filled, silently succeed (do not tip off bots, do not store).
  if (cleanString(body.company)) {
    return Response.json({ ok: true });
  }

  const email = cleanString(body.email, 254);
  const phone = cleanPhone(body.phone);
  const firstName = cleanString(body.firstName, 80);
  const source = cleanString(body.source, 60) || "shift-guide";
  const locale = cleanString(body.locale, 8) || "en";

  // Quiz segmentation (optional; present for the /shift quiz funnel).
  const readiness = cleanString(body.readiness, 40) || undefined;
  const interest = cleanString(body.interest, 40) || undefined;
  const answers: Record<string, string> = {};
  if (body.answers && typeof body.answers === "object") {
    for (const [k, v] of Object.entries(body.answers as Record<string, unknown>)) {
      answers[cleanString(k, 40)] = cleanString(v, 80);
    }
  }
  const tags = Array.isArray(body.tags)
    ? (body.tags as unknown[]).map((t) => cleanString(t, 60)).filter(Boolean).slice(0, 20)
    : [];

  const emailOk = isValidEmail(email);
  const phoneOk = phone.replace(/\D/g, "").length >= 6;

  // She follows up manually, so EITHER a valid email OR a usable phone is enough.
  if (!emailOk && !phoneOk) {
    return Response.json(
      { ok: false, error: "Please add a valid email or WhatsApp number so I can reach you." },
      { status: 422 },
    );
  }

  // Sync to the email tool only when we have a valid email (it needs one).
  if (emailOk) {
    const sub = await addSubscriber({ email, firstName, tag: source });
    if (!sub.ok) {
      return Response.json(
        { ok: false, error: "We could not save your details just now. Please try again." },
        { status: 502 },
      );
    }
  }

  // Capture the full profile (contact, quiz answers, interest, readiness) so
  // Nastasia can follow up manually by email or WhatsApp and upsell.
  const profile = {
    email: emailOk ? email : undefined,
    phone: phoneOk ? phone : undefined,
    firstName,
    source,
    locale,
    answers,
    tags,
    interest,
    readiness,
  };
  await recordLead(profile);
  // Email the lead to Nastasia (info@fitnessbynastasia.com) for manual follow up.
  await sendLeadNotification(profile);

  // Best-effort instant guide delivery if we have an email (no-op without Resend).
  if (emailOk) {
    await sendGuideEmail({ email, firstName });
  }

  return Response.json({ ok: true });
}
