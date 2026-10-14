"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, AlertTriangle, UserPlus, FileText } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/data/companyData';
import { Field, fieldA11y, Honeypot, SubmitSpinner } from './forms/Field';
import {
  submitLead,
  whatsappLink,
  fieldsToMessage,
  isFormDeliveryConfigured,
  isValidIndianPhone,
  isValidEmail,
  isValidGstin,
  isValidPincode,
  makeReferenceId,
} from '@/lib/forms';

const BUSINESS_TYPES = [
  'Retail Chemist / Pharmacy',
  'Chain Pharmacy',
  'Hospital / Nursing Home',
  'Clinic / Doctor Dispensary',
  'Sub-stockist / Distributor',
  'Government / Institutional Buyer',
];

const MONTHLY_VOLUMES = [
  'Below ₹1 Lakh',
  '₹1 – 5 Lakh',
  '₹5 – 15 Lakh',
  'Above ₹15 Lakh',
];

const CONTACT_PREFS = ['WhatsApp', 'Phone Call', 'Email'];

const INTEREST_OPTIONS = PRODUCT_CATEGORIES.filter((c) => c.id !== 'all');

const EMPTY = {
  businessName: '',
  businessType: '',
  contactName: '',
  phone: '',
  email: '',
  dl20b: '',
  dl21b: '',
  gstin: '',
  address: '',
  area: '',
  pincode: '',
  monthlyVolume: '',
  contactPref: 'WhatsApp',
  message: '',
};

type FormState = typeof EMPTY;
type ErrorKey = keyof FormState | 'consent';
type Errors = Partial<Record<ErrorKey, string>>;

function validate(f: FormState, consent: boolean): Errors {
  const e: Errors = {};
  if (f.businessName.trim().length < 2) e.businessName = 'Enter your registered business name.';
  if (!f.businessType) e.businessType = 'Select your business type.';
  if (f.contactName.trim().length < 2) e.contactName = 'Enter the owner or purchase manager’s name.';
  if (!isValidIndianPhone(f.phone)) e.phone = 'Enter a valid 10-digit mobile number.';
  if (!isValidEmail(f.email)) e.email = 'Enter a valid email address for invoices and statements.';
  if (f.dl20b.trim().length < 4) e.dl20b = 'Enter your Form 20B drug licence number.';
  if (!isValidGstin(f.gstin)) e.gstin = 'Enter a valid 15-character GSTIN (e.g. 27ABCDE1234F1Z5).';
  if (f.address.trim().length < 8) e.address = 'Enter the full delivery address.';
  if (!isValidPincode(f.pincode)) e.pincode = 'Enter a valid 6-digit PIN code.';
  if (!consent) e.consent = 'Please confirm to continue.';
  return e;
}

export default function AccountRegistrationForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [failMessage, setFailMessage] = useState('');
  const [refId, setRefId] = useState('');
  const onlineEnabled = isFormDeliveryConfigured();

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = key === 'gstin' ? e.target.value.toUpperCase() : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleInterest = (name: string) =>
    setInterests((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const leadFields = (ref: string) => ({
    'Reference ID': ref,
    'Business Name': form.businessName,
    'Business Type': form.businessType,
    'Contact Person': form.contactName,
    Mobile: form.phone,
    Email: form.email,
    'Drug Licence 20B': form.dl20b,
    'Drug Licence 21B': form.dl21b,
    GSTIN: form.gstin,
    Address: form.address,
    'Area / Locality': form.area,
    'PIN Code': form.pincode,
    'Expected Monthly Purchase': form.monthlyVolume,
    'Categories of Interest': interests.join(', '),
    'Preferred Contact': form.contactPref,
    Message: form.message,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form, consent);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`reg-${firstInvalid}`)?.focus();
      return;
    }

    const ref = makeReferenceId('VSM-AC');

    if (!onlineEnabled) {
      window.open(whatsappLink(fieldsToMessage('NEW WHOLESALE ACCOUNT REQUEST', leadFields(ref))), '_blank', 'noopener,noreferrer');
      return;
    }

    setStatus('sending');
    const result = await submitLead(
      `New Account Request ${ref} — ${form.businessName} (${form.businessType})`,
      leadFields(ref),
      { replyTo: form.email, botcheck }
    );
    if (result.ok) {
      setRefId(ref);
      setStatus('sent');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFailMessage(result.message);
      setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <div className="form-panel">
        <div className="form-success" role="status">
          <CheckCircle2 size={52} className="text-emerald-600 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-extrabold text-slate-800 text-2xl font-heading mb-2">Application Received</h2>
          <p className="text-sm text-slate-600 mb-1">
            Reference ID: <strong className="font-mono text-emerald-700 text-base">{refId}</strong>
          </p>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
            Thank you, {form.contactName}. Our accounts team will verify the licence details for{' '}
            <strong>{form.businessName}</strong> and contact you by {form.contactPref.toLowerCase()} within one
            working day. Please keep scanned copies of your documents ready.
          </p>
          <a
            href={whatsappLink(`Hello VS Medico, I just submitted a wholesale account request (Ref: ${refId}) for ${form.businessName}. Sharing my documents here.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>Share Documents on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form-panel">
      <Honeypot checked={botcheck} onChange={setBotcheck} />

      <fieldset className="form-section">
        <legend className="form-section-title">
          <span className="form-step">1</span> Business Details
        </legend>
        <div className="form-row-2">
          <Field id="reg-businessName" label="Registered Business Name" required error={errors.businessName}>
            <input
              type="text"
              autoComplete="organization"
              placeholder="e.g. Sanjeevani Medical & General Stores"
              value={form.businessName}
              onChange={update('businessName')}
              className="form-control"
              {...fieldA11y('reg-businessName', errors.businessName)}
            />
          </Field>
          <Field id="reg-businessType" label="Business Type" required error={errors.businessType}>
            <select
              value={form.businessType}
              onChange={update('businessType')}
              className="form-control"
              {...fieldA11y('reg-businessType', errors.businessType)}
            >
              <option value="" disabled>Select business type</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="form-row-2">
          <Field
            id="reg-dl20b"
            label="Drug Licence No. (Form 20B)"
            required
            error={errors.dl20b}
            hint="As printed on your FDA licence"
          >
            <input
              type="text"
              placeholder="e.g. MH-MZ5-123456"
              value={form.dl20b}
              onChange={update('dl20b')}
              className="form-control"
              {...fieldA11y('reg-dl20b', errors.dl20b, 'As printed on your FDA licence')}
            />
          </Field>
          <Field id="reg-dl21b" label="Drug Licence No. (Form 21B)" hint="Needed for Schedule C/C1 & cold-chain items">
            <input
              type="text"
              placeholder="e.g. MH-MZ5-123457"
              value={form.dl21b}
              onChange={update('dl21b')}
              className="form-control"
              {...fieldA11y('reg-dl21b', undefined, 'Needed for Schedule C/C1 & cold-chain items')}
            />
          </Field>
        </div>

        <Field id="reg-gstin" label="GSTIN" required error={errors.gstin} className="mb-2">
          <input
            type="text"
            maxLength={15}
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="27ABCDE1234F1Z5"
            value={form.gstin}
            onChange={update('gstin')}
            className="form-control font-mono"
            {...fieldA11y('reg-gstin', errors.gstin)}
          />
        </Field>
      </fieldset>

      <fieldset className="form-section">
        <legend className="form-section-title">
          <span className="form-step">2</span> Contact Person
        </legend>
        <Field id="reg-contactName" label="Owner / Purchase Manager Name" required error={errors.contactName} className="mb-4">
          <input
            type="text"
            autoComplete="name"
            placeholder="e.g. Rahul Mehta"
            value={form.contactName}
            onChange={update('contactName')}
            className="form-control"
            {...fieldA11y('reg-contactName', errors.contactName)}
          />
        </Field>
        <div className="form-row-2">
          <Field id="reg-phone" label="Mobile Number" required error={errors.phone}>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98XXX XXXXX"
              value={form.phone}
              onChange={update('phone')}
              className="form-control"
              {...fieldA11y('reg-phone', errors.phone)}
            />
          </Field>
          <Field id="reg-email" label="Email Address" required error={errors.email}>
            <input
              type="email"
              autoComplete="email"
              placeholder="purchase@yourpharmacy.com"
              value={form.email}
              onChange={update('email')}
              className="form-control"
              {...fieldA11y('reg-email', errors.email)}
            />
          </Field>
        </div>
        <div className="form-field mb-2">
          <span className="form-label" id="reg-contactPref-label">Preferred Contact Method</span>
          <div className="choice-group" role="radiogroup" aria-labelledby="reg-contactPref-label">
            {CONTACT_PREFS.map((pref) => (
              <label key={pref} className={`choice-chip ${form.contactPref === pref ? 'is-selected' : ''}`}>
                <input
                  type="radio"
                  name="reg-contactPref"
                  value={pref}
                  checked={form.contactPref === pref}
                  onChange={update('contactPref')}
                />
                <span>{pref}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend className="form-section-title">
          <span className="form-step">3</span> Delivery Address
        </legend>
        <Field id="reg-address" label="Shop / Hospital Address" required error={errors.address} className="mb-4">
          <textarea
            rows={2}
            autoComplete="street-address"
            placeholder="Shop no., building, street"
            value={form.address}
            onChange={update('address')}
            className="form-control form-control-short"
            {...fieldA11y('reg-address', errors.address)}
          />
        </Field>
        <div className="form-row-2">
          <Field id="reg-area" label="Area / Locality">
            <input
              type="text"
              autoComplete="address-level2"
              placeholder="e.g. Mulund West"
              value={form.area}
              onChange={update('area')}
              className="form-control"
              {...fieldA11y('reg-area')}
            />
          </Field>
          <Field id="reg-pincode" label="PIN Code" required error={errors.pincode}>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              placeholder="400078"
              value={form.pincode}
              onChange={update('pincode')}
              className="form-control"
              {...fieldA11y('reg-pincode', errors.pincode)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend className="form-section-title">
          <span className="form-step">4</span> Purchase Requirements
        </legend>
        <Field id="reg-monthlyVolume" label="Expected Monthly Purchase" className="mb-4">
          <select
            value={form.monthlyVolume}
            onChange={update('monthlyVolume')}
            className="form-control"
            {...fieldA11y('reg-monthlyVolume')}
          >
            <option value="">Prefer not to say</option>
            {MONTHLY_VOLUMES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </Field>

        <div className="form-field mb-4">
          <span className="form-label" id="reg-interests-label">Categories You Purchase</span>
          <div className="choice-group" role="group" aria-labelledby="reg-interests-label">
            {INTEREST_OPTIONS.map((cat) => {
              const selected = interests.includes(cat.name);
              return (
                <label key={cat.id} className={`choice-chip ${selected ? 'is-selected' : ''}`}>
                  <input type="checkbox" checked={selected} onChange={() => toggleInterest(cat.name)} />
                  <span>{cat.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        <Field id="reg-message" label="Anything Else We Should Know?">
          <textarea
            rows={3}
            maxLength={1500}
            placeholder="Top brands you purchase, credit terms required, delivery timing preferences..."
            value={form.message}
            onChange={update('message')}
            className="form-control"
            {...fieldA11y('reg-message')}
          />
        </Field>
      </fieldset>

      <div className="form-field mb-6">
        <label className={`consent-row ${errors.consent ? 'has-error' : ''}`}>
          <input
            id="reg-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'reg-consent-error' : undefined}
          />
          <span className="form-consent-note">
            I confirm that this business holds valid drug licences and GST registration, and I agree to be contacted by
            VS Medico regarding this application as described in the{' '}
            <Link href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="reg-consent-error" className="form-error" role="alert">{errors.consent}</p>
        )}
      </div>

      {status === 'failed' && (
        <div className="form-alert form-alert-error mb-4" role="alert">
          <AlertTriangle size={18} className="shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">{failMessage}</p>
            <a
              href={whatsappLink(fieldsToMessage('NEW WHOLESALE ACCOUNT REQUEST', leadFields('—')))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm mt-3"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span>Send Application on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn btn-primary btn-lg justify-center"
      >
        {status === 'sending' ? (
          <SubmitSpinner />
        ) : onlineEnabled ? (
          <UserPlus size={20} aria-hidden="true" />
        ) : (
          <MessageCircle size={20} aria-hidden="true" />
        )}
        <span>
          {status === 'sending'
            ? 'Submitting Application…'
            : onlineEnabled
              ? 'Submit Account Application'
              : 'Send Application via WhatsApp'}
        </span>
      </button>
      <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5 text-center">
        <FileText size={13} aria-hidden="true" />
        <span>Your details are used only for account verification and are never shared.</span>
      </p>
    </form>
  );
}
