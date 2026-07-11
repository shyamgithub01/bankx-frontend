import { Link } from 'react-router-dom';

export function Button({ children, loading = false, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary:
      'bg-brand-600 text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700 focus-visible:outline-brand-600',
    secondary:
      'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 focus-visible:outline-slate-400',
    danger:
      'bg-rose-600 text-white shadow-sm shadow-rose-600/25 hover:bg-rose-700 focus-visible:outline-rose-600',
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}

export function Field({ label, error, hint, id, ...props }) {
  const inputId = id || props.name;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        id={inputId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:ring-4 focus:outline-none ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
            : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500/15'
        }`}
      />

      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function Select({ label, id, children, ...props }) {
  const inputId = id || props.name;
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        {...props}
        id={inputId}
        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 shadow-xs transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none"
      >
        {children}
      </select>
    </div>
  );
}

/**
 * The persistent in-form error banner — this is what shows "Invalid email or
 * password" and stays put until the next submit, unlike a toast.
 */
export function FormError({ message }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="animate-shake flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3.5"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="mt-px h-5 w-5 shrink-0 text-rose-600"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path d="M12 7v6" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
      <p className="text-sm font-medium whitespace-pre-line text-rose-800">{message}</p>
    </div>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

/** Centered shell for the four auth screens: brand panel + form, side by side. */
export function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-brand-950 p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          className="absolute -top-24 -right-16 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl"
          aria-hidden="true"
        />

        <Link to="/" className="relative flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-semibold text-white">BankX</span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="text-3xl leading-tight font-bold text-white">
            Banking that keeps up with you.
          </h2>
          <p className="mt-4 text-brand-200">
            Move money, track balances and manage accounts — all from one secure place.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              'Bank-grade encryption on every request',
              'Instant transfers between accounts',
              'Real-time balance updates',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-brand-100">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/25">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3">
                    <path d="M20 6 9 17l-5-5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-brand-300/70">
          © {new Date().getFullYear()} BankX. All rights reserved.
        </p>
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="animate-fade-up w-full max-w-md">
          {eyebrow && (
            <span className="mb-3 inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
              {eyebrow}
            </span>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-brand-600" />
      <path d="M16 7 25 12v2H7v-2l9-5Z" className="fill-white" />
      <path d="M10 16h2.5v6H10v-6Zm4.75 0h2.5v6h-2.5v-6Zm4.75 0H22v6h-2.5v-6Z" className="fill-white" />
      <rect x="8" y="23.5" width="16" height="2" rx="1" className="fill-white" />
    </svg>
  );
}
