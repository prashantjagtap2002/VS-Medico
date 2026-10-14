"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQS } from '@/data/companyData';
import { whatsappLink } from '@/lib/forms';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-16 bg-white border-t border-slate-200" aria-labelledby="faq-heading">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 flex flex-col gap-4">
            <div>
              <span className="text-secondary font-bold text-xs uppercase tracking-wider block mb-1">
                COMMON B2B QUESTIONS
              </span>
              <h2 id="faq-heading" className="font-heading font-extrabold text-3xl text-primary mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Everything you need to know about opening a wholesale account, cold chain logistics, and delivery terms
                with VS Medico.
              </p>
            </div>

            <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100 mt-2">
              <h3 className="font-bold text-primary text-base mb-1">Have a specific inquiry?</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Reach our Bhandup wholesale sales desk on WhatsApp for rate sheets or stock updates, or apply for a
                wholesale account online.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={whatsappLink('Hello VS Medico, I have a question regarding wholesale supply.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm inline-flex"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>Ask Sales Desk</span>
                </a>
                <Link href="/register" className="btn btn-outline btn-sm inline-flex">
                  Open an Account
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${index}`}
                    >
                      <span className="font-bold text-primary text-base text-left">{faq.q}</span>
                      <ChevronDown size={20} className="faq-chevron shrink-0" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${index}`}
                    role="region"
                    aria-labelledby={`faq-q-${index}`}
                    className="faq-answer-box"
                    hidden={!isOpen}
                  >
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
