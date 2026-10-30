"use client";

import { Download } from 'lucide-react';

/** Opens the browser print dialog, where "Save as PDF" downloads the profile. */
export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-solid no-print">
      <Download size={16} aria-hidden="true" /> Download PDF
    </button>
  );
}
