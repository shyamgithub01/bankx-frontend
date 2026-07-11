import { Link } from 'react-router-dom';
import { getUser } from '../auth';
import { Logo } from '../components/ui';

const FEATURES = [
  {
    img: '/assets/security.png',
    title: 'Secure by default',
    desc: 'Passwords are hashed and every transaction is authorised before it moves a rupee.',
  },
  {
    img: '/assets/fraud.png',
    title: 'Fraud aware',
    desc: 'We never ask for your password, OTP or card details by phone, SMS or email.',
  },
  {
    img: '/assets/support.png',
    title: '24/7 support',
    desc: 'Our team is available around the clock for anything you need help with.',
  },
];

const STATS = [
  { value: '2M+', label: 'Customers' },
  { value: '₹40B', label: 'Moved monthly' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.8/5', label: 'App rating' },
];

export default function HomePage() {
  const user = getUser();

  return (
    <main>
      <section className="relative overflow-hidden bg-brand-950">
        <div
          className="absolute -top-32 -right-24 h-[30rem] w-[30rem] rounded-full bg-brand-600/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-brand-500/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100 ring-1 ring-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Trusted by 2 million customers
            </span>

            <h1 className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
              Banking that keeps up with you.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-brand-200">
              Open an account in minutes, move money instantly and track every rupee — all from one
              secure place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex h-12 items-center rounded-lg bg-white px-6 text-sm font-semibold text-brand-900 shadow-lg shadow-brand-950/30 transition hover:bg-brand-50"
                >
                  Go to dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex h-12 items-center rounded-lg bg-white px-6 text-sm font-semibold text-brand-900 shadow-lg shadow-brand-950/30 transition hover:bg-brand-50"
                  >
                    Open an account
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex h-12 items-center rounded-lg px-6 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="animate-fade-up relative hidden lg:block">
            <img
              src="/assets/welcome.png"
              alt=""
              className="w-full rounded-2xl shadow-2xl shadow-brand-950/50 ring-1 ring-white/10"
            />
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-bold text-white tabular-nums">{s.value}</dt>
                <dd className="mt-1 text-sm text-brand-300">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-3 text-slate-600">
            The essentials of modern banking, built to be fast, clear and safe.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 transition hover:shadow-md"
            >
              <img src={f.img} alt="" className="h-12 w-12 object-contain" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path d="M12 9v4" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>

            <div>
              <h2 className="text-lg font-semibold text-amber-900">Stay alert to scams</h2>
              <ul className="mt-3 space-y-2 text-sm text-amber-800">
                <li>· Never share your password, OTP or card details with anyone.</li>
                <li>· BankX staff will never call or email you asking for credentials.</li>
                <li>· Always check for the padlock in your browser before signing in.</li>
                <li>· Report anything suspicious to security@bankx.example immediately.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-semibold text-slate-900">BankX</span>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} BankX. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm text-slate-500">
            <Link to="/employee-login" className="transition hover:text-slate-900">
              Employee
            </Link>
            <Link to="/admin-login" className="transition hover:text-slate-900">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
