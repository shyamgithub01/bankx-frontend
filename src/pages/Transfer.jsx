import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, errorMessage } from '../api/client';
import { getUser } from '../auth';
import { useToast } from '../components/toast-context';
import { Button, Card, Field, FormError, PageHeader } from '../components/ui';

const MAX_TXN = 200000;

const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

export default function Transfer() {
  const user = getUser();
  const [form, setForm] = useState({
    receiver_aadhar_card_number: '',
    receiver_account_number: '',
    amount: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const update = (name) => (e) => {
    let { value } = e.target;
    if (name === 'receiver_aadhar_card_number' || name === 'receiver_account_number')
      value = value.replace(/\D/g, '').slice(0, 12);

    setForm((f) => ({ ...f, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setReceipt(null);

    const value = parseFloat(form.amount);
    const found = {};

    if (!/^\d{12}$/.test(form.receiver_aadhar_card_number))
      found.receiver_aadhar_card_number = "Receiver's Aadhar must be 12 digits.";
    else if (form.receiver_aadhar_card_number === user.aadhar_card_number)
      found.receiver_aadhar_card_number = 'You cannot transfer to your own account.';

    if (!/^\d{12}$/.test(form.receiver_account_number))
      found.receiver_account_number = "Receiver's account number must be 12 digits.";

    if (!form.amount || Number.isNaN(value) || value <= 0)
      found.amount = 'Enter an amount greater than zero.';
    else if (value > MAX_TXN)
      found.amount = `A single transfer cannot exceed ${formatINR(MAX_TXN)}.`;

    if (!form.password) found.password = 'Confirm your password to authorise this transfer.';

    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/transactions/transfer', {
        sender_aadhar_card_number: user.aadhar_card_number,
        password: form.password,
        receiver_aadhar_card_number: form.receiver_aadhar_card_number,
        receiver_account_number: form.receiver_account_number,
        amount: value,
      });

      setReceipt({ sent: value, sender: res.data.sender, receiver: res.data.receiver });
      setForm({
        receiver_aadhar_card_number: '',
        receiver_account_number: '',
        amount: '',
        password: '',
      });
      toast.success(
        'Transfer complete',
        `${formatINR(value)} sent to ${res.data.receiver.full_name}.`,
      );
    } catch (err) {
      const message = errorMessage(err, 'Transfer failed. Please try again.');
      setFormError(message);
      toast.error('Transfer failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg px-5 py-10">
      <PageHeader title="Transfer money" subtitle="Send funds to another BankX account." />

      <Card className="animate-fade-up">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FormError message={formError} />

          <div className="rounded-lg bg-slate-50 p-3.5 text-sm ring-1 ring-slate-200">
            <p className="text-slate-500">Sending from</p>
            <p className="mt-0.5 font-mono font-semibold text-slate-900">{user.account_number}</p>
          </div>

          <Field
            label="Receiver's Aadhar number"
            name="receiver_aadhar_card_number"
            inputMode="numeric"
            placeholder="12 digits"
            value={form.receiver_aadhar_card_number}
            onChange={update('receiver_aadhar_card_number')}
            error={errors.receiver_aadhar_card_number}
          />

          <Field
            label="Receiver's account number"
            name="receiver_account_number"
            inputMode="numeric"
            placeholder="12 digits"
            value={form.receiver_account_number}
            onChange={update('receiver_account_number')}
            error={errors.receiver_account_number}
          />

          <Field
            label="Amount"
            name="amount"
            type="number"
            min="1"
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            value={form.amount}
            onChange={update('amount')}
            error={errors.amount}
          />

          <Field
            label="Confirm your password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
          />

          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              {loading ? 'Sending…' : 'Send money'}
            </Button>
          </div>
        </form>

        {receipt && (
          <div className="animate-fade-up mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                  <path d="M20 6 9 17l-5-5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm font-semibold text-emerald-900">
                {formatINR(receipt.sent)} sent successfully
              </p>
            </div>

            <dl className="mt-3 space-y-1.5 border-t border-emerald-200 pt-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-emerald-700">Sent to</dt>
                <dd className="font-medium text-emerald-900">{receipt.receiver.full_name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-emerald-700">Your new balance</dt>
                <dd className="font-semibold text-emerald-900">{formatINR(receipt.sender.balance)}</dd>
              </div>
            </dl>
          </div>
        )}
      </Card>
    </main>
  );
}
