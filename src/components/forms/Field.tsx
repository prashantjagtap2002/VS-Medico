import React, { ReactNode } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/** Label + control + inline error/hint. The control must use `id` and `fieldA11y(id, error)`. */
export function Field({ id, label, required, error, hint, className = '', children }: FieldProps) {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-mark" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="form-error" role="alert">
          <AlertCircle size={13} aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="form-hint">{hint}</p>
      ) : null}
    </div>
  );
}

/** ARIA props linking a control to its Field error/hint. */
export function fieldA11y(id: string, error?: string, hint?: string) {
  return {
    id,
    name: id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}

/** Hidden honeypot. Humans never see it; bots that fill it are silently dropped. */
export function Honeypot({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <input
      type="checkbox"
      name="botcheck"
      className="hp-field"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}

export function SubmitSpinner() {
  return <Loader2 size={18} className="spin" aria-hidden="true" />;
}
