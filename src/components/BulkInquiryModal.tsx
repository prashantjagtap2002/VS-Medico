"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useQuoteBasket } from './QuoteBasketContext';
import Modal from './Modal';
import { Field, fieldA11y, Honeypot, SubmitSpinner } from './forms/Field';
import {
  submitLead,
  whatsappLink,
  isFormDeliveryConfigured,
  isValidIndianPhone,
  isValidEmail,
  makeReferenceId,
} from '@/lib/forms';
import {
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Send,
  CheckCircle2,
  ShoppingBag,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';

const EMPTY = { storeName: '', contactPerson: '', phone: '', email: '', area: '', notes: '' };
type FormState = typeof EMPTY;
type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const errors: Errors = {};
  if (f.storeName.trim().length < 2) errors.storeName = 'Enter your pharmacy or hospital name.';
  if (f.contactPerson.trim().length < 2) errors.contactPerson = 'Enter the contact person’s name.';
  if (!f.phone.trim()) errors.phone = 'Mobile number is required.';
  else if (!isValidIndianPhone(f.phone)) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (f.email.trim() && !isValidEmail(f.email)) errors.email = 'Enter a valid email address.';
  return errors;
}

export default function BulkInquiryModal() {
  const { basket, removeFromBasket, updateQuantity, clearBasket, isModalOpen, setIsModalOpen } = useQuoteBasket();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [failMessage, setFailMessage] = useState('');
  const [inquiryId, setInquiryId] = useState('');
  const onlineEnabled = isFormDeliveryConfigured();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name.replace(/^bq-/, '') as keyof FormState;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const itemsText = () =>
    basket.length > 0
      ? basket.map((item, i) => `${i + 1}. ${item.name} (${item.brand}) — Pack: ${item.packSize} — Qty: ${item.quantity}`).join('\n')
      : 'General PTR wholesale price list request';

  const whatsappMessage = (refId?: string) => {
    let msg = `*B2B WHOLESALE INQUIRY - VS MEDICO LLP*${refId ? ` (Ref: ${refId})` : ''}\n`;
    msg += `----------------------------------------\n`;
    msg += `*Pharmacy / Hospital:* ${form.storeName || 'Not specified'}\n`;
    msg += `*Contact Person:* ${form.contactPerson || 'Not specified'}\n`;
    msg += `*Phone:* ${form.phone || 'Not specified'}\n`;
    if (form.email) msg += `*Email:* ${form.email}\n`;
    msg += `*Area / Location:* ${form.area || 'Mumbai/MMR'}\n`;
    msg += `----------------------------------------\n`;
    msg += `*REQUESTED ITEMS & QUANTITIES:*\n${itemsText()}\n`;
    if (form.notes) msg += `----------------------------------------\n*Additional Notes:* ${form.notes}\n`;
    return msg;
  };

  const runValidation = () => {
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) document.getElementById(`bq-${firstInvalid}`)?.focus();
    return !firstInvalid;
  };

  const handleWhatsAppSend = () => {
    if (!runValidation()) return;
    window.open(whatsappLink(whatsappMessage()), '_blank', 'noopener,noreferrer');
  };

  const handleSubmitOnline = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onlineEnabled) {
      handleWhatsAppSend();
      return;
    }
    if (!runValidation()) return;

    const refId = makeReferenceId();
    setStatus('sending');
    const result = await submitLead(
      `Wholesale Quote Request ${refId} — ${form.storeName}`,
      {
        'Reference ID': refId,
        'Pharmacy / Hospital': form.storeName,
        'Contact Person': form.contactPerson,
        Phone: form.phone,
        Email: form.email,
        'Area / Location': form.area,
        'Requested Items': itemsText(),
        'Additional Notes': form.notes,
      },
      { replyTo: form.email || undefined, botcheck }
    );
    if (result.ok) {
      setInquiryId(refId);
      setStatus('sent');
    } else {
      setFailMessage(result.message);
      setStatus('failed');
    }
  };

  const close = () => {
    setIsModalOpen(false);
    if (status === 'sent') {
      clearBasket();
      setForm(EMPTY);
      setStatus('idle');
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={close}
      titleId="bulk-inquiry-title"
      header={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
            <ShoppingBag size={22} aria-hidden="true" />
          </div>
          <div>
            <h2 id="bulk-inquiry-title" className="font-bold text-primary text-xl font-heading">
              B2B Bulk Wholesale Inquiry
            </h2>
            <p className="text-xs text-slate-500">VS Medico LLP • Bhandup West, Mumbai</p>
          </div>
        </div>
      }
    >
      {status === 'sent' ? (
        <div className="text-center py-8" role="status">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-extrabold text-primary mb-2 font-heading">Inquiry Submitted Successfully!</h3>
          <p className="text-sm text-slate-600 mb-2">
            Reference ID: <strong className="text-emerald-700 font-mono text-base">{inquiryId}</strong>
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
            Our wholesale sales desk will contact <strong>{form.storeName}</strong> at <strong>{form.phone}</strong> with
            net PTR rates and stock confirmation. Keep the reference ID for follow-ups.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(whatsappMessage(inquiryId))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>Also Share on WhatsApp</span>
            </a>
            <button type="button" onClick={close} className="btn btn-outline">
              Close
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-slate-800 text-sm">Selected Products ({basket.length})</h3>
              {basket.length > 0 && (
                <button
                  type="button"
                  onClick={clearBasket}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Trash2 size={13} aria-hidden="true" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {basket.length > 0 ? (
              <ul className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-slate-50 flex flex-col gap-2">
                {basket.map((item) => (
                  <li key={item.id} className="p-3 flex items-center justify-between gap-3 bg-white rounded-lg border border-slate-200">
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-primary">{item.name}</div>
                      <div className="text-xs text-slate-500">
                        {item.brand} • Pack: {item.packSize}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border border-slate-300 rounded-md bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={13} aria-hidden="true" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={13} aria-hidden="true" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromBasket(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-800 flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-sky-600" aria-hidden="true" />
                <span>Your basket is empty. You can still submit this form to receive our full wholesale price list.</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmitOnline} className="flex flex-col gap-4" noValidate>
            <Honeypot checked={botcheck} onChange={setBotcheck} />

            <div className="form-row-2 mb-0">
              <Field id="bq-storeName" label="Pharmacy / Hospital Name" required error={errors.storeName}>
                <input
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Apex Chemist & Druggist"
                  value={form.storeName}
                  onChange={handleInputChange}
                  className="form-control"
                  {...fieldA11y('bq-storeName', errors.storeName)}
                />
              </Field>
              <Field id="bq-contactPerson" label="Contact Person" required error={errors.contactPerson}>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Rajesh Sharma"
                  value={form.contactPerson}
                  onChange={handleInputChange}
                  className="form-control"
                  {...fieldA11y('bq-contactPerson', errors.contactPerson)}
                />
              </Field>
            </div>

            <div className="form-row-2 mb-0">
              <Field id="bq-phone" label="WhatsApp Mobile Number" required error={errors.phone}>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 98XXX XXXXX"
                  value={form.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  {...fieldA11y('bq-phone', errors.phone)}
                />
              </Field>
              <Field id="bq-email" label="Email (optional)" error={errors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="purchase@yourpharmacy.com"
                  value={form.email}
                  onChange={handleInputChange}
                  className="form-control"
                  {...fieldA11y('bq-email', errors.email)}
                />
              </Field>
            </div>

            <Field id="bq-area" label="Location / Area in Mumbai">
              <input
                type="text"
                autoComplete="address-level2"
                placeholder="e.g. Bhandup West, Thane, Powai"
                value={form.area}
                onChange={handleInputChange}
                className="form-control"
                {...fieldA11y('bq-area')}
              />
            </Field>

            <Field id="bq-notes" label="Additional Instructions / Quantity Specs">
              <textarea
                rows={2}
                maxLength={1500}
                placeholder="Batch expiry preference, box quantities, or delivery instructions..."
                value={form.notes}
                onChange={handleInputChange}
                className="form-control"
                {...fieldA11y('bq-notes')}
              />
            </Field>

            {status === 'failed' && (
              <div className="form-alert form-alert-error" role="alert">
                <AlertTriangle size={18} className="shrink-0" aria-hidden="true" />
                <p className="font-semibold">{failMessage}</p>
              </div>
            )}

            <p className="text-xs text-slate-500 form-consent-note">
              By submitting you agree to our{' '}
              <Link href="/privacy" onClick={close}>
                Privacy Policy
              </Link>
              . For licensed trade buyers only.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="btn btn-whatsapp flex-1 justify-center py-3"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Send via WhatsApp</span>
              </button>

              {onlineEnabled && (
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary flex-1 justify-center py-3"
                >
                  {status === 'sending' ? <SubmitSpinner /> : <Send size={18} aria-hidden="true" />}
                  <span>{status === 'sending' ? 'Submitting…' : 'Submit Quote Request'}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
