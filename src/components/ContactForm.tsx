"use client";

import React, { useState, FormEvent } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    fullName: '',
    storeName: '',
    email: '',
    phone: '',
    inquiryType: 'Wholesale Pricing',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.fullName || !formState.phone) {
      alert("Please fill in your name and contact phone number.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-md" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="mb-8" style={{ textAlign: 'center' }}>
        <h3 className="font-extrabold text-primary text-2xl font-heading mb-2">
          Send Us a B2B Inquiry
        </h3>
        <p className="text-slate-500 text-sm" style={{ maxWidth: '550px', margin: '0 auto' }}>
          Whether you need a new chemist account registration, hospital rate contract, or stock availability check, our sales team is here to assist.
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-12 bg-emerald-50 rounded-2xl border border-emerald-200">
          <CheckCircle2 size={48} className="text-emerald-600 mx-auto mb-3" />
          <h4 className="font-extrabold text-slate-800 text-xl font-heading mb-2">Message Received!</h4>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-4 leading-relaxed">
            Thank you, <strong>{formState.fullName}</strong>. Our wholesale sales executive will reach out to <strong>{formState.storeName || 'your pharmacy'}</strong> shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormState({
                fullName: '',
                storeName: '',
                email: '',
                phone: '',
                inquiryType: 'Wholesale Pricing',
                message: ''
              });
            }}
            className="btn btn-primary btn-sm"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid-2">
            <div className="form-group mb-0">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Mehta"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Pharmacy / Hospital Name</label>
              <input
                type="text"
                placeholder="e.g. Sanjeevani Medical Stores"
                value={formState.storeName}
                onChange={(e) => setFormState({ ...formState, storeName: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group mb-0">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98200 XXXXX"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="chemist@domain.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group mb-0">
            <label className="form-label">Inquiry Subject / Category</label>
            <select
              value={formState.inquiryType}
              onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
              className="form-control"
            >
              <option value="Wholesale Pricing">Request Wholesale Rates / PTR List</option>
              <option value="New Chemist Registration">New Chemist Account Opening</option>
              <option value="Hospital Bulk Contract">Hospital & ICU Institutional Order</option>
              <option value="Cold Chain Vaccines">Cold Chain / Insulin Supply</option>
              <option value="General Query">General Inquiry</option>
            </select>
          </div>

          <div className="form-group mb-0">
            <label className="form-label">Your Message or Required SKUs</label>
            <textarea
              rows={4}
              placeholder="List specific brands or products required, quantities, or delivery location details..."
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary py-3.5 justify-center text-base mt-1" style={{ maxWidth: '320px', margin: '0 auto', width: '100%' }}>
            <Send size={18} />
            <span>Submit B2B Inquiry</span>
          </button>
        </form>
      )}
    </div>
  );
}
