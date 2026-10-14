"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, MessageCircle, AlertTriangle } from 'lucide-react';
import { Field, fieldA11y, Honeypot, SubmitSpinner } from './forms/Field';
import {
  submitLead,
  whatsappLink,
  isFormDeliveryConfigured,
  fieldsToMessage,
  isValidIndianPhone,
  isValidEmail,
} from '@/lib/forms';

const INQUIRY_TYPES = [
  { value: 'Wholesale Pricing', label: 'Request Wholesale Rates / PTR List' },
  { value: 'New Chemist Registration', label: 'New Chemist Account Opening' },
  { value: 'Hospital Bulk Contract', label: 'Hospital & ICU Institutional Order' },
  { value: 'Cold Chain Vaccines', label: 'Cold Chain / Insulin Supply' },
  { value: 'Order Tracking', label: 'Existing Order / Delivery Status' },
  { value: 'General Query', label: 'General Inquiry' },
];

const EMPTY = {
  fullName: '',
  storeName: '',
  email: '',
  phone: '',
  inquiryType: INQUIRY_TYPES[0].value,
  message: '',
};

type FormState = typeof EMPTY;
type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const errors: Errors = {};
  if (f.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';
  if (!f.phone.trim()) errors.phone = 'Phone number is required so we can call you back.';
  else if (!isValidIndianPhone(f.phone)) errors.phone = 'Enter a valid 10-digit Indian mobile or landline number.';
  if (f.email.trim() && !isValidEmail(f.email)) errors.email = 'Enter a valid email address.';
  if (f.message.length > 2000) errors.message = 'Please keep your message under 2,000 characters.';
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [failMessage, setFailMessage] = useState('');

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const leadFields = () => ({
    'Full Name': form.fullName,
    'Pharmacy / Hospital': form.storeName,
    Phone: form.phone,
    Email: form.email,
    'Inquiry Type': form.inquiryType,
    Message: form.message,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`cf-${firstInvalid}`)?.focus();
      return;
    }

    if (!isFormDeliveryConfigured()) {
      // No email delivery configured for this build: hand the lead to WhatsApp instead.
      window.open(whatsappLink(fieldsToMessage('WEBSITE INQUIRY - VS MEDICO', leadFields())), '_blank', 'noopener,noreferrer');
      return;
    }

    setStatus('sending');
    const result = await submitLead(
      `Website Inquiry: ${form.inquiryType} — ${form.storeName || form.fullName}`,
      leadFields(),
      { replyTo: form.email || undefined, botcheck }
    );
    if (result.ok) {
      setStatus('sent');
    } else {
      setFailMessage(result.message);
      setStatus('failed');
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setStatus('idle');
  };

  return (
    <div className="form-panel">
      <div className="mb-6">
        <h2 className="font-extrabold text-primary text-2xl font-heading mb-1">Send Us a B2B Inquiry</h2>
        <p className="text-slate-500 text-sm">
          Fill out the form and our wholesale sales team will get back to you within one working day.
        </p>
      </div>

      {status === 'sent' ? (
        <div className="form-success" role="status">
          <CheckCircle2 size={48} className="text-emerald-600 mx-auto mb-3" aria-hidden="true" />
          <h3 className="font-extrabold text-slate-800 text-xl font-heading mb-2">Message Received!</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-4 leading-relaxed">
            Thank you, <strong>{form.fullName}</strong>. Our wholesale sales executive will reach out to{' '}
            <strong>{form.storeName || 'you'}</strong> on <strong>{form.phone}</strong> shortly.
          </p>
          <button type="button" onClick={reset} className="btn btn-primary btn-sm">
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <Honeypot checked={botcheck} onChange={setBotcheck} />

          <div className="form-row-2">
            <Field id="cf-fullName" label="Full Name" required error={errors.fullName}>
              <input
                type="text"
                autoComplete="name"
                placeholder="e.g. Rahul Mehta"
                value={form.fullName}
                onChange={update('fullName')}
                className="form-control"
                {...fieldA11y('cf-fullName', errors.fullName)}
              />
            </Field>
            <Field id="cf-storeName" label="Pharmacy / Hospital Name">
              <input
                type="text"
                autoComplete="organization"
                placeholder="e.g. Sanjeevani Medical Stores"
                value={form.storeName}
                onChange={update('storeName')}
                className="form-control"
                {...fieldA11y('cf-storeName')}
              />
            </Field>
          </div>

          <div className="form-row-2">
            <Field id="cf-phone" label="Phone Number" required error={errors.phone}>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98XXX XXXXX"
                value={form.phone}
                onChange={update('phone')}
                className="form-control"
                {...fieldA11y('cf-phone', errors.phone)}
              />
            </Field>
            <Field id="cf-email" label="Email Address" error={errors.email}>
              <input
                type="email"
                autoComplete="email"
                placeholder="chemist@example.com"
                value={form.email}
                onChange={update('email')}
                className="form-control"
                {...fieldA11y('cf-email', errors.email)}
              />
            </Field>
          </div>

          <Field id="cf-inquiryType" label="Inquiry Subject" className="mb-4">
            <select
              value={form.inquiryType}
              onChange={update('inquiryType')}
              className="form-control"
              {...fieldA11y('cf-inquiryType')}
            >
              {INQUIRY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </Field>

          <Field id="cf-message" label="Your Message or Required SKUs" error={errors.message} className="mb-6">
            <textarea
              rows={4}
              maxLength={2000}
              placeholder="List brands or products required, quantities, or delivery location..."
              value={form.message}
              onChange={update('message')}
              className="form-control"
              {...fieldA11y('cf-message', errors.message)}
            />
          </Field>

          {status === 'failed' && (
            <div className="form-alert form-alert-error mb-4" role="alert">
              <AlertTriangle size={18} className="shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">{failMessage}</p>
                <a
                  href={whatsappLink(fieldsToMessage('WEBSITE INQUIRY - VS MEDICO', leadFields()))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm mt-3"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>Send This Inquiry on WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full btn btn-primary py-3 justify-center text-base"
          >
            {status === 'sending' ? <SubmitSpinner /> : <Send size={18} aria-hidden="true" />}
            <span>
              {status === 'sending'
                ? 'Sending…'
                : isFormDeliveryConfigured()
                  ? 'Submit B2B Inquiry'
                  : 'Send Inquiry via WhatsApp'}
            </span>
          </button>
          <p className="text-xs text-slate-500 mt-3 text-center form-consent-note">
            We use your details only to respond to this inquiry (see our <Link href="/privacy">Privacy Policy</Link>).
            B2B buyers with valid drug licences only.
          </p>
        </form>
      )}
    </div>
  );
}
