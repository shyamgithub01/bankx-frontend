import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, errorMessage } from '../api/client';
import { getUser } from '../auth';
import { useToast } from '../components/toast-context';
import { Button, Card, Field, FormError, PageHeader } from '../components/ui';

const MAX_TXN = 200000;

const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

const QUICK = [500, 1000, 5000, 10000];

export default function Deposit() {
  const user = getUser();
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [newBalance, setNewBalance] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setNewBalance(null);

    const value = parseFloat(amount);
    const found = {};

    if (!amount || Number.isNaN(value) || value <= 0)
      found.amount = 'Enter an amount greater than zero.';
    else if (value > MAX_TXN) found.amount = `A single deposit cannot exceed ${formatINR(MAX_TXN)}.`;
    if (!password) found.password = 'Confirm your password to authorise this deposit.';

    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/transactions/deposit', {
        aadhar_card_number: user.aadhar_card_number,
        password,
        amount: value,
      });

      const balance = res.data.account.balance;
      setNewBalance(balance);
      setAmount('');
      setPassword('');
      setErrors({});
      toast.success('Deposit successful', `${formatINR(value)} added. New balance: ${formatINR(balance)}.`);
    } catch (err) {
      const message = errorMessage(err, 'Deposit failed. Please try again.');
      setFormError(message);
      toast.error('Deposit failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg px-5 py-10">
      <PageHeader title="Deposit funds" subtitle="Add money to your BankX account instantly." />

      <Card className="animate-fade-up">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FormError message={formError} />

          <div className="rounded-lg bg-slate-50 p-3.5 text-sm ring-1 ring-slate-200">
            <p className="text-slate-500">Depositing into</p>
            <p className="mt-0.5 font-mono font-semibold text-slate-900">{user.account_number}</p>
          </div>

          <div>
            <Field
              label="Amount"
              name="amount"
              type="number"
              min="1"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setErrors((p) => ({ ...p, amount: undefined }));
              }}
              error={errors.amount}
            />

            <div className="mt-2.5 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setAmount(String(q));
                    setErrors((p) => ({ ...p, amount: undefined }));
                  }}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  +{formatINR(q)}
                </button>
              ))}
            </div>
          </div>

          <Field
            label="Confirm your password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((p) => ({ ...p, password: undefined }));
            }}
            error={errors.password}
          />

          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              {loading ? 'Processing…' : 'Deposit'}
            </Button>
          </div>
        </form>

        {newBalance !== null && (
          <div className="animate-fade-up mt-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path d="M20 6 9 17l-5-5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-emerald-900">Deposit complete</p>
              <p className="text-sm text-emerald-700">
                New balance: <span className="font-semibold">{formatINR(newBalance)}</span>
              </p>
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}
