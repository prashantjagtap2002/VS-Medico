/**
 * Form submission + validation helpers shared by every form on the site.
 *
 * The site is a static export (no server), so submissions are delivered by
 * Web3Forms (https://web3forms.com) straight from the browser. Set
 * NEXT_PUBLIC_WEB3FORMS_KEY at build time to enable email delivery. The access
 * key is designed to be public, so exposing it in client code is expected.
 *
 * If the key is missing or the request fails, callers fall back to WhatsApp so
 * a lead is never silently lost.
 */

import { COMPANY_INFO } from '@/data/companyData';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// A flat shape (not a discriminated union) because tsconfig has `strict: false`,
// which disables narrowing on `ok`.
export interface SubmitResult {
  ok: boolean;
  reason?: 'not-configured' | 'network' | 'rejected';
  message?: string;
}

export function isFormDeliveryConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
}

/**
 * Sends a form submission as an email to the VS Medico sales inbox.
 * `fields` become rows in the email body; keep keys human readable.
 */
export async function submitLead(
  subject: string,
  fields: Record<string, string>,
  options: { replyTo?: string; botcheck?: boolean } = {}
): Promise<SubmitResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    return {
      ok: false,
      reason: 'not-configured',
      message: 'Online form delivery is not set up yet. Please send your request on WhatsApp instead.',
    };
  }

  // Honeypot tripped: pretend success so bots get no signal.
  if (options.botcheck) return { ok: true };

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: `${COMPANY_INFO.name} Website`,
        ...(options.replyTo ? { replyto: options.replyTo } : {}),
        // Skip blank optional fields so the email only lists what was filled in.
        ...Object.fromEntries(Object.entries(fields).filter(([, v]) => v && v.trim())),
      }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.success) return { ok: true };
    return {
      ok: false,
      reason: 'rejected',
      message: data?.message || 'We could not submit your request right now. Please try again or use WhatsApp.',
    };
  } catch {
    return {
      ok: false,
      reason: 'network',
      message: 'Network error. Check your connection and try again, or send your request on WhatsApp.',
    };
  }
}

/** Builds a wa.me deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

/** tel: link in E.164 form, e.g. "+91 022 2595 6789" -> "tel:+912225956789". */
export function telHref(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('910')) digits = '91' + digits.slice(3);
  return `tel:+${digits}`;
}

/** Formats form fields as a readable WhatsApp message. */
export function fieldsToMessage(title: string, fields: Record<string, string>): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `*${k}:* ${v.trim()}`);
  return [`*${title}*`, ...lines].join('\n');
}

/* ---------- Validation ---------- */

/** Indian phone: 10 digits after stripping +91 / leading 0, spaces and dashes. */
export function isValidIndianPhone(value: string): boolean {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[2-9]\d{9}$/.test(digits);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** 15-character GSTIN, e.g. 27ABCDE1234F1Z5. */
export function isValidGstin(value: string): boolean {
  return /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value.trim().toUpperCase());
}

export function isValidPincode(value: string): boolean {
  return /^[1-9]\d{5}$/.test(value.trim());
}

/** Generates a short human-friendly reference ID like VSM-K3F9Q2. */
export function makeReferenceId(prefix = 'VSM'): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${id}`;
}
