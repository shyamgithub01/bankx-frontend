import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, errorMessage } from '../api/client';
import { clearSession, getUser } from '../auth';
import { useToast } from '../components/toast-context';
import { Card, PageHeader } from '../components/ui';

const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(n);

export default function Dashboard() {
  const user = getUser();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const loadBalance = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      // Credentials come from the session, so there is nothing to re-enter.
      const res = await api.get('/accounts/balance', {
        params: { email: user.email, password: user.password },
      });
      setBalance(res.data.balance);
    } catch (err) {
      // A 401 here means the stored session no longer matches the account.
      if (err.response?.status === 401) {
        clearSession();
        toast.error('Session expired', 'Please sign in again.');
        navigate('/login');
        return;
      }
      const message = errorMessage(err, 'Could not load your balance.');
      setError(message);
      toast.error('Balance unavailable', message);
    } finally {
      setLoading(false);
    }
  }, [user.email, user.password, navigate, toast]);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  const actions = [
    {
      to: '/deposit',
      title: 'Deposit',
      desc: 'Add money to your account',
      icon: <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />,
    },
    {
      to: '/transfer',
      title: 'Transfer',
      desc: 'Send money to another account',
      icon: (
        <path
          d="M4 8h13m0 0-3.5-3.5M17 8l-3.5 3.5M20 16H7m0 0 3.5-3.5M7 16l3.5 3.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <PageHeader
        title={`Welcome back${user.email ? `, ${user.email.split('@')[0]}` : ''}`}
        subtitle="Here's an overview of your account."
      />

      <div className="animate-fade-up relative overflow-hidden rounded-2xl bg-brand-950 p-6 shadow-lg shadow-brand-950/20 sm:p-8">
        <div
          className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand-200">Available balance</p>

            <div className="mt-2 flex items-center gap-3">
              {loading ? (
                <div className="h-10 w-48 animate-pulse rounded-lg bg-white/10" />
              ) : error ? (
                <p className="text-lg font-medium text-rose-300">Unavailable</p>
              ) : (
                <p className="text-4xl font-bold tracking-tight text-white tabular-nums">
                  {hidden ? '••••••' : formatINR(balance ?? 0)}
                </p>
              )}

              {!loading && !error && (
                <button
                  onClick={() => setHidden((h) => !h)}
                  aria-label={hidden ? 'Show balance' : 'Hide balance'}
                  className="rounded-lg p-1.5 text-brand-300 transition hover:bg-white/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                    {hidden ? (
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.4 5.2A9.6 9.6 0 0 1 12 5c5 0 9 4.5 9 7a11 11 0 0 1-2.2 3.2M6.2 6.7A11.4 11.4 0 0 0 3 12c0 2.5 4 7 9 7a9.9 9.9 0 0 0 3.4-.6"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    ) : (
                      <>
                        <path
                          d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
                          strokeWidth="1.8"
                        />
                        <circle cx="12" cy="12" r="2.75" strokeWidth="1.8" />
                      </>
                    )}
                  </svg>
                </button>
              )}
            </div>

            <p className="mt-4 font-mono text-sm tracking-wider text-brand-200">
              {user.account_number
                ? user.account_number.replace(/(\d{4})(?=\d)/g, '$1 ')
                : '•••• •••• ••••'}
            </p>
          </div>

          <button
            onClick={loadBalance}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            >
              <path
                d="M20 11A8 8 0 0 0 6.3 6.3L4 8.5M4 13a8 8 0 0 0 13.7 4.7L20 15.5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M4 4v4.5h4.5M20 20v-4.5h-4.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-sm font-semibold tracking-wide text-slate-500 uppercase">
        Quick actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition hover:shadow-md hover:ring-brand-300"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                {a.icon}
              </svg>
            </span>
            <div>
              <p className="font-semibold text-slate-900">{a.title}</p>
              <p className="text-sm text-slate-500">{a.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <Card className="mt-6">
        <h2 className="text-sm font-semibold text-slate-900">Account details</h2>
        <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <dt className="text-slate-500">Email</dt>
            <dd className="font-medium text-slate-900">{user.email}</dd>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <dt className="text-slate-500">Account number</dt>
            <dd className="font-mono font-medium text-slate-900">{user.account_number}</dd>
          </div>
        </dl>
      </Card>
    </main>
  );
}
