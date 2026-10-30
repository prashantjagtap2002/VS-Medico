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
    <>
      <section className="page-header">
        <div className="container">
          <h1>Open a Wholesale Account</h1>
          <p>
            Licensed retail chemists, hospitals, nursing homes and clinics can apply for a B2B billing account. Our
            accounts team verifies your licences and activates your account, usually within one working day.
          </p>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          <AccountRegistrationForm />

          <aside className="grid gap-6 lg:sticky lg:top-28">
            <div className="card">
              <h2 className="heading-2 mb-5">Documents You&apos;ll Need</h2>
              <ul className="grid gap-4">
                {DOCUMENTS.map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="icon-circle w-9! h-9!">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm text-ink!">{title}</p>
                      <p className="text-xs!">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-xs! mt-5 pt-4 border-t border-[#dee2e6]">
                You don&apos;t need to upload anything now. We&apos;ll collect copies on WhatsApp or email after you apply.
              </p>
            </div>

            <div className="profile-contact">
              <h2 className="text-lg text-white mb-4">Why Open an Account?</h2>
              <ul className="grid gap-3">
                {BENEFITS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-white/90">
                    <Icon size={18} className="text-orange-brand shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink('Hello VS Medico, I would like help opening a wholesale account.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full mt-6"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Need Help? Chat With Us</span>
              </a>
              <p className="text-xs text-white/75 text-center mt-3">or call {COMPANY_INFO.contact.phoneSales}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
