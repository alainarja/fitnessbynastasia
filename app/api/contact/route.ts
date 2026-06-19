import type { NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/leads";
import { isValidEmail, cleanString } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);
  const limited = rateLimit(`contact:${ip}`, { limit: 4, windowMs: 60_000 });
  if (!limited.ok) {
    return Response.json({ ok: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (cleanString(body.company)) {
    return Response.json({ ok: true }); // honeypot
  }

  const name = cleanString(body.name, 120);
  const email = cleanString(body.email, 254);
  const message = cleanString(body.message, 4000);

  if (!name || !isValidEmail(email) || message.length < 2) {
    return Response.json({ ok: false, error: "Please fill in your name, a valid email, and a message." }, { status: 422 });
  }

  const sent = await sendContactEmail({ name, email, message });
  if (!sent.ok) {
    return Response.json({ ok: false, error: "We could not send your message. Please try WhatsApp or email." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
