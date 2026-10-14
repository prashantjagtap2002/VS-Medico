import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import AccountRegistrationForm from '@/components/AccountRegistrationForm';
import { COMPANY_INFO } from '@/data/companyData';
import { whatsappLink } from '@/lib/forms';
import { FileCheck, Receipt, IdCard, BadgeCheck, Clock, Truck, BadgePercent, MessageCircle } from 'lucide-react';

export const metadata: Metadata = pageMetadata({
  title: 'Open a Wholesale Account',
  description:
    'Register your retail chemist, pharmacy, hospital or clinic with VS Medico LLP for wholesale PTR pricing, credit terms and same-day delivery across Mumbai MMR.',
  path: '/register',
});

const DOCUMENTS = [
  { icon: FileCheck, title: 'Drug Licence (Form 20B & 21B)', desc: 'Valid FDA wholesale/retail drug licence copies' },
  { icon: Receipt, title: 'GST Registration Certificate', desc: 'GSTIN must match the billing name' },
  { icon: BadgeCheck, title: 'Registered Pharmacist Licence', desc: 'Of the pharmacist in charge' },
  { icon: IdCard, title: 'Business PAN Card', desc: 'Proprietor, partnership or company PAN' },
];

const BENEFITS = [
  { icon: BadgePercent, text: 'Net PTR wholesale pricing & running schemes' },
  { icon: Truck, text: 'Same-day delivery across Mumbai, Thane & MMR' },
  { icon: Clock, text: 'Account activated within 1 working day of verification' },
];

export default function RegisterPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container">
        <div className="max-w-3xl mb-10">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">NEW BUYER ONBOARDING</span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mt-2 mb-3">
            Open a Wholesale Account with VS Medico
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Licensed retail chemists, hospitals, nursing homes and clinics can apply for a B2B billing account. Fill in
            your business details below — our accounts team verifies your licences and activates your account, usually
            within one working day.
          </p>
        </div>

        <div className="register-layout">
          <AccountRegistrationForm />

          <aside className="register-aside">
            <div className="aside-card">
              <h2 className="font-heading font-bold text-lg text-primary mb-4">Documents You&apos;ll Need</h2>
              <ul className="flex flex-col gap-4">
                {DOCUMENTS.map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-sky-50 text-secondary flex items-center justify-center shrink-0">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{title}</p>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                You don&apos;t need to upload anything now. We&apos;ll collect copies on WhatsApp or email after you apply.
              </p>
            </div>

            <div className="aside-card aside-card-dark">
              <h2 className="font-heading font-bold text-lg text-white mb-4">Why Open an Account?</h2>
              <ul className="flex flex-col gap-3">
                {BENEFITS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-200">
                    <Icon size={18} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink('Hello VS Medico, I would like help opening a wholesale account.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full justify-center mt-6"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Need Help? Chat With Us</span>
              </a>
              <p className="text-xs text-slate-400 text-center mt-3">or call {COMPANY_INFO.contact.phoneSales}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
