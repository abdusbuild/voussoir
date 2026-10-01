"use server";

import { headers } from "next/headers";
import {
  EMPTY_VALUES,
  FIELD_ORDER,
  validateAll,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactErrors;
  values: ContactValues;
};

// Bots fill forms in milliseconds; people take longer than this.
const MIN_FILL_MS = 3000;

// Best-effort limit per server instance: 5 enquiries per IP per 10 minutes.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    recentByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentByIp.set(ip, recent);
  return false;
}

const FALLBACK =
  "Please email us at info@voussoir.in or call +91 93196 88233 instead.";

export async function sendEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: ContactValues = { ...EMPTY_VALUES };
  for (const field of FIELD_ORDER) {
    const raw = formData.get(field);
    values[field] = typeof raw === "string" ? raw.trim() : "";
  }

  // Honeypot filled or form submitted impossibly fast: pretend it worked so
  // the bot learns nothing. No-JS visitors send no timestamp and skip this.
  const started = Number(formData.get("started"));
  const tooFast = started > 0 && Date.now() - started < MIN_FILL_MS;
  if (formData.get("company_website") || tooFast) {
    return { status: "success", values: EMPTY_VALUES };
  }

  const errors = validateAll(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: `You've sent several messages in a short time. ${FALLBACK}`,
      values,
    };
  }

  try {
    await deliver(values);
  } catch (err) {
    console.error("[contact] failed to send enquiry:", err);
    return {
      status: "error",
      message: `Sorry, your message couldn't be sent. ${FALLBACK}`,
      values,
    };
  }

  return { status: "success", values: EMPTY_VALUES };
}

async function deliver(values: ContactValues) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "info@voussoir.in";

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY/CONTACT_FROM_EMAIL not set — enquiry logged only:", values);
      return;
    }
    throw new Error("RESEND_API_KEY and CONTACT_FROM_EMAIL must be set in production");
  }

  // Strip line breaks so user input can't add headers via the subject.
  const subjectName = values.name.replace(/[\r\n]+/g, " ");

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "—"}`,
    `Project type: ${values.projectType}`,
    "",
    values.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: values.email,
      subject: `New enquiry: ${values.projectType} — ${subjectName}`,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}
