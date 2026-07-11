import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from './toast-context';

const VARIANTS = {
  success: {
    ring: 'ring-emerald-200',
    bar: 'bg-emerald-500',
    iconWrap: 'bg-emerald-50 text-emerald-600',
    icon: (
      <path d="M20 6 9 17l-5-5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  error: {
    ring: 'ring-rose-200',
    bar: 'bg-rose-500',
    iconWrap: 'bg-rose-50 text-rose-600',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path d="M12 7v6" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  info: {
    ring: 'ring-brand-200',
    bar: 'bg-brand-500',
    iconWrap: 'bg-brand-50 text-brand-600',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path d="M12 11v5" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
};

let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    // Mark as leaving first so the exit animation can play, then unmount.
    setToasts((all) => all.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => setToasts((all) => all.filter((t) => t.id !== id)), 200);
  }, []);

  const push = useCallback(
    (variant, title, message, duration = 5000) => {
      const id = ++nextId;
      setToasts((all) => [...all, { id, variant, title, message, leaving: false }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  const toast = useMemo(
    () => ({
      success: (title, message) => push('success', title, message),
      error: (title, message) => push('error', title, message, 6500),
      info: (title, message) => push('info', title, message),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div
        className="pointer-events-none fixed top-4 right-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => {
          const v = VARIANTS[t.variant] ?? VARIANTS.info;
          return (
            <div
              key={t.id}
              role={t.variant === 'error' ? 'alert' : 'status'}
              aria-live={t.variant === 'error' ? 'assertive' : 'polite'}
              className={`pointer-events-auto relative flex gap-3 overflow-hidden rounded-xl bg-white p-4 shadow-lg shadow-slate-900/10 ring-1 ${v.ring} ${
                t.leaving ? 'animate-toast-out' : 'animate-toast-in'
              }`}
            >
              <span className={`absolute inset-y-0 left-0 w-1 ${v.bar}`} aria-hidden="true" />

              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${v.iconWrap}`}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                  {v.icon}
                </svg>
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{t.title}</p>
                {t.message && (
                  <p className="mt-0.5 text-sm whitespace-pre-line text-slate-600">{t.message}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="-mt-1 -mr-1 h-7 w-7 shrink-0 rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mx-auto h-4 w-4">
                  <path d="M18 6 6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
