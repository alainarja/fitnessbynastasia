/**
 * leads.ts — email marketing + transactional delivery.
 *
 * Two providers, both optional and swappable:
 *  - Subscriber sync: MailerLite OR Kit (ConvertKit). Set ONE via env.
 *  - Guide delivery: Resend (optional). If absent, rely on the email tool's automation.
 *
 * If the relevant env var is missing, every function becomes a no op that still
 * RESOLVES SUCCESSFULLY and logs a warning, so the site builds and runs without keys.
 */

import { site } from "@/content/site";

type SubscribeInput = {
  email: string;
  firstName?: string;
  tag?: string; // e.g. "shift-guide"
};

type Result = { ok: boolean; skipped?: boolean; error?: string };

/* -------------------------------------------------------------------------- */
/* Subscriber sync                                                            */
/* -------------------------------------------------------------------------- */
export async function addSubscriber({ email, firstName, tag = "shift-guide" }: SubscribeInput): Promise<Result> {
  const provider = (process.env.EMAIL_PROVIDER || "").toLowerCase();

  try {
    if (provider === "mailerlite" && process.env.MAILERLITE_API_KEY) {
      return await mailerlite({ email, firstName, tag });
    }
    if (provider === "kit" && process.env.KIT_API_KEY) {
      return await kit({ email, firstName, tag });
    }

    console.warn(
      `[leads] No email provider configured (EMAIL_PROVIDER=${provider || "unset"}). ` +
        `Subscriber "${email}" (tag: ${tag}) was NOT synced. Set EMAIL_PROVIDER + the matching API key.`,
    );
    return { ok: true, skipped: true };
  } catch (err) {
    console.error("[leads] addSubscriber failed:", err);
    // Do not lose the lead silently. Surface failure so the caller can decide.
    return { ok: false, error: err instanceof Error ? err.message : "unknown error" };
  }
}

async function mailerlite({ email, firstName }: SubscribeInput): Promise<Result> {
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify({
      email,
      fields: firstName ? { name: firstName } : undefined,
      // A group id is optional. If MAILERLITE_GROUP_ID is set, add to that group.
      groups: process.env.MAILERLITE_GROUP_ID ? [process.env.MAILERLITE_GROUP_ID] : undefined,
    }),
  });

  if (!res.ok && res.status !== 200 && res.status !== 201) {
    const text = await res.text().catch(() => "");
    throw new Error(`MailerLite ${res.status}: ${text}`);
  }
  return { ok: true };
}

async function kit({ email, firstName }: SubscribeInput): Promise<Result> {
  // Kit (ConvertKit) v4 API. Prefer adding to a tag so automations can fire.
  const apiKey = process.env.KIT_API_KEY!;
  const tagId = process.env.KIT_TAG_ID;

  const endpoint = tagId
    ? `https://api.kit.com/v4/tags/${tagId}/subscribers`
    : `https://api.kit.com/v4/subscribers`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({
      email_address: email,
      first_name: firstName || undefined,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Kit ${res.status}: ${text}`);
  }
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/* Quiz / lead profile capture (provider agnostic)                            */
/* -------------------------------------------------------------------------- */
type LeadProfile = {
  email?: string;
  phone?: string;
  firstName?: string;
  source: string;
  locale?: string;
  answers?: Record<string, string>;
  tags?: string[];
  interest?: string;
  readiness?: string;
};

/**
 * Captures the full lead profile (quiz answers, segmentation tags, readiness) so
 * Nastasia can follow up and upsell. If LEAD_WEBHOOK_URL is set (Zapier, Make,
 * n8n, a CRM endpoint, etc.) the profile is POSTed there. Otherwise it is logged.
 * Best effort: never blocks the opt in, never throws.
 */
export async function recordLead(profile: LeadProfile): Promise<Result> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    console.warn(`[leads] LEAD_WEBHOOK_URL unset. Lead profile (set a webhook to capture for upsell):`);
    console.warn(`[leads] ${JSON.stringify(profile)}`);
    return { ok: true, skipped: true };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error(`Lead webhook ${res.status}`);
    return { ok: true };
  } catch (err) {
    console.error("[leads] recordLead failed:", err);
    // Do not block the opt in if the webhook is down.
    return { ok: true, skipped: true, error: err instanceof Error ? err.message : "unknown" };
  }
}

/**
 * Emails the full SHIFT quiz lead to Nastasia so she can follow up manually.
 * Sent to LEAD_TO_EMAIL (falls back to CONTACT_TO_EMAIL, then site email).
 * Best effort: never blocks the opt in.
 */
export async function sendLeadNotification(profile: LeadProfile): Promise<Result> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[leads] RESEND_API_KEY missing. Lead notification not emailed.");
    return { ok: true, skipped: true };
  }

  const from = process.env.GUIDE_FROM_EMAIL || `Website <hello@${site.domain}>`;
  const to = process.env.LEAD_TO_EMAIL || process.env.CONTACT_TO_EMAIL || site.contact.email;

  const rows: string[] = [
    ["Name", profile.firstName || "(not given)"],
    ["Email", profile.email || "(not given)"],
    ["WhatsApp", profile.phone || "(not given)"],
    ["Interested in", profile.interest || "(n/a)"],
    ["Readiness", profile.readiness || "(n/a)"],
    ["Language", profile.locale || "en"],
    ["Source", profile.source],
  ].map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5a4434;">${k}</td><td style="padding:4px 0;color:#3a2a1e;"><strong>${escapeHtml(v)}</strong></td></tr>`);

  const answerRows = Object.entries(profile.answers || {})
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5a4434;">${escapeHtml(k)}</td><td style="padding:4px 0;color:#3a2a1e;">${escapeHtml(v)}</td></tr>`)
    .join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: profile.email || undefined,
        subject: `New SHIFT quiz lead${profile.firstName ? `: ${profile.firstName}` : ""}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#3a2a1e;">
            <h2 style="font-family:Georgia,serif;color:#c02d1e;">New lead from the SHIFT quiz</h2>
            <table style="border-collapse:collapse;font-size:14px;">${rows.join("")}</table>
            <h3 style="font-family:Georgia,serif;margin-top:20px;">Quiz answers</h3>
            <table style="border-collapse:collapse;font-size:14px;">${answerRows || "<tr><td>(none)</td></tr>"}</table>
          </div>`,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Resend ${res.status}: ${text}`);
    }
    return { ok: true };
  } catch (err) {
    console.error("[leads] sendLeadNotification failed:", err);
    return { ok: true, skipped: true, error: err instanceof Error ? err.message : "unknown" };
  }
}

/* -------------------------------------------------------------------------- */
/* Guide delivery (transactional) via Resend (optional)                       */
/* -------------------------------------------------------------------------- */
export async function sendGuideEmail({ email, firstName }: { email: string; firstName?: string }): Promise<Result> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[leads] RESEND_API_KEY missing. Skipping direct guide email (rely on provider automation).");
    return { ok: true, skipped: true };
  }

  const from = process.env.GUIDE_FROM_EMAIL || `Nastasia <hello@${site.domain}>`;
  const guideUrl = `${site.baseUrl}${site.guidePdfPath}`;
  const hi = firstName ? `Hi ${firstName},` : "Hi,";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Your free guide: the 4 mistakes keeping you stuck",
        html: guideEmailHtml({ hi, guideUrl }),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Resend ${res.status}: ${text}`);
    }
    return { ok: true };
  } catch (err) {
    console.error("[leads] sendGuideEmail failed:", err);
    return { ok: false, error: err instanceof Error ? err.message : "unknown error" };
  }
}

function guideEmailHtml({ hi, guideUrl }: { hi: string; guideUrl: string }): string {
  return `
  <div style="font-family: Arial, sans-serif; color:#3a2a1e; background:#f1e8d9; padding:32px;">
    <div style="max-width:520px; margin:0 auto; background:#fbf5ea; border-radius:8px; padding:32px;">
      <h1 style="font-family: Georgia, serif; color:#3a2a1e; font-size:24px; margin:0 0 16px;">${hi}</h1>
      <p style="line-height:1.6;">Here is your free guide to the 4 mistakes that keep women stuck in the gym, and exactly how to fix each one.</p>
      <p style="margin:24px 0;">
        <a href="${guideUrl}" style="background:#c02d1e; color:#fbf5ea; text-decoration:none; padding:14px 24px; border-radius:8px; display:inline-block; font-weight:bold;">Download your guide</a>
      </p>
      <p style="line-height:1.6;">Read it, pick one fix, and start there. When you are ready for help putting it all together, just reply to this email.</p>
      <p style="line-height:1.6; margin-top:24px;">Nastasia<br/><span style="color:#5a4434;">Fitness by Nastasia</span></p>
    </div>
  </div>`;
}

/* -------------------------------------------------------------------------- */
/* Contact form delivery via Resend (optional)                                */
/* -------------------------------------------------------------------------- */
export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<Result> {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`[leads] RESEND_API_KEY missing. Contact message from ${email} logged but not emailed.`);
    console.warn(`[leads] Contact: ${name} <${email}> — ${message}`);
    return { ok: true, skipped: true };
  }

  const from = process.env.GUIDE_FROM_EMAIL || `Website <hello@${site.domain}>`;
  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New message from ${name} via fitnessbynastasia.com`,
        html: `<p><strong>${name}</strong> (${email}) wrote:</p><p style="white-space:pre-wrap;">${escapeHtml(message)}</p>`,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Resend ${res.status}: ${text}`);
    }
    return { ok: true };
  } catch (err) {
    console.error("[leads] sendContactEmail failed:", err);
    return { ok: false, error: err instanceof Error ? err.message : "unknown error" };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
