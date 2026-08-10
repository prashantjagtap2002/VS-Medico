"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShoppingBag,
  AlertCircle
} from 'lucide-react';

export default function BulkInquiryModal() {
  const { 
    basket, 
    removeFromBasket, 
    updateQuantity, 
    clearBasket, 
    isModalOpen, 
    setIsModalOpen 
  } = useQuoteBasket();

  const [formData, setFormData] = useState({
    storeName: '',
    contactPerson: '',
    phone: '',
    area: '',
    dlNumber: '',
    gstin: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  if (!isModalOpen) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    let msg = `*B2B WHOLESALE INQUIRY - VS MEDICO LLP*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Pharmacy / Hospital:* ${formData.storeName || 'Not specified'}\n`;
    msg += `*Contact Person:* ${formData.contactPerson || 'Not specified'}\n`;
    msg += `*Phone:* ${formData.phone || 'Not specified'}\n`;
    msg += `*Area / Location:* ${formData.area || 'Mumbai/MMR'}\n`;
    if (formData.dlNumber) msg += `*DL No:* ${formData.dlNumber}\n`;
    if (formData.gstin) msg += `*GSTIN:* ${formData.gstin}\n`;
    msg += `----------------------------------------\n`;
    msg += `*REQUESTED ITEMS & QUANTITIES:*\n`;

    if (basket.length > 0) {
      basket.forEach((item, index) => {
        msg += `${index + 1}. *${item.name}* (${item.brand})\n`;
        msg += `   Pack: ${item.packSize} | Qty: *${item.quantity}*\n`;
      });
    } else {
      msg += `General PTR Wholesale Price List Request\n`;
    }

    if (formData.notes) {
      msg += `----------------------------------------\n`;
      msg += `*Additional Notes:* ${formData.notes}\n`;
    }

    return encodeURIComponent(msg);
  };

  const handleWhatsAppSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.storeName || !formData.phone) {
      alert("Please enter your Store Name and Phone Number to submit the inquiry.");
      return;
    }
    const waText = generateWhatsAppMessage();
    const url = `https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${waText}`;
    window.open(url, '_blank');
  };

  const handleSubmitOnline = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.storeName || !formData.phone) {
      alert("Please enter your Store Name and Phone Number.");
      return;
    }
    const randomId = 'VSM-' + Math.floor(100000 + Math.random() * 900000);
    setInquiryId(randomId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    clearBasket();
    setIsModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-2xl">
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-secondary" size={24} />
            <div>
              <h3 className="font-bold text-primary text-xl font-heading">
                B2B Bulk Wholesale Inquiry
              </h3>
              <p className="text-xs text-slate-500">
                VS Medico LLP • Bhandup West, Mumbai
              </p>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="modal-close">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-2xl font-extrabold text-primary mb-2 font-heading">Inquiry Submitted Successfully!</h4>
            <p className="text-sm text-slate-600 mb-2">
              Inquiry Reference ID: <strong className="text-emerald-700 font-mono text-base">{inquiryId}</strong>
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
              Our wholesale sales desk will contact <strong>{formData.storeName}</strong> at <strong>{formData.phone}</strong> shortly with net PTR rates and stock confirmation.
            </p>

            <div className="flex justify-center gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Forward via WhatsApp Now</span>
              </a>
              <button onClick={handleReset} className="btn btn-outline">
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Basket Items List */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <span>Selected Products ({basket.length})</span>
                </h4>
                {basket.length > 0 && (
                  <button
                    onClick={clearBasket}
                    className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 size={13} />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {basket.length > 0 ? (
                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 p-2 bg-slate-50">
                  {basket.map((item) => (
                    <div key={item.id} className="p-2.5 flex items-center justify-between gap-3 bg-white rounded-lg mb-1.5 shadow-2xs">
                      <div>
                        <div className="font-bold text-sm text-primary">{item.name}</div>
                        <div className="text-xs text-slate-500">
                          {item.brand} • Pack: {item.packSize}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-300 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:bg-slate-100"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-600 hover:bg-slate-100"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromBasket(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-800 flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-sky-600" />
                  <span>Your basket is empty. You can still submit this form to receive our full general wholesale price list.</span>
                </div>
              )}
            </div>

            {/* Chemist / Hospital Details Form */}
            <form onSubmit={handleSubmitOnline} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-group mb-0">
                  <label className="form-label">Pharmacy / Hospital Name *</label>
                  <input
                    type="text"
                    name="storeName"
                    required
                    placeholder="e.g. Apex Chemist & Druggist"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Contact Person Name *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    placeholder="e.g. Mr. Rajesh Sharma"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-group mb-0">
                  <label className="form-label">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Location / Area in Mumbai</label>
                  <input
                    type="text"
                    name="area"
                    placeholder="e.g. Bhandup West, Thane, Powai"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-group mb-0">
                  <label className="form-label">Drug License No. (Form 20B/21B)</label>
                  <input
                    type="text"
                    name="dlNumber"
                    placeholder="MH-MUM-20B-XXXXXX"
                    value={formData.dlNumber}
                    onChange={handleInputChange}
                    className="form-control text-xs"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">GSTIN (Optional)</label>
                  <input
                    type="text"
                    name="gstin"
                    placeholder="27XXXXX0000X1ZX"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    className="form-control text-xs"
                  />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Additional Instructions / Quantity Specs</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Specify required batch expiry preference, box quantities, or special delivery instructions..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="btn btn-whatsapp flex-1 justify-center py-3"
                >
                  <MessageCircle size={18} />
                  <span>Send via WhatsApp Instant</span>
                </button>

                <button
                  type="submit"
                  className="btn btn-primary flex-1 justify-center py-3"
                >
                  <Send size={18} />
                  <span>Submit Web Order Quote</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
