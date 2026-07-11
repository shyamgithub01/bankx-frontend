import { useState } from 'react';
import { api, errorMessage } from '../api/client';
import { getEmployee } from '../auth';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../components/toast-context';
import { Button, Card, Field, FormError, PageHeader } from '../components/ui';

export default function DeleteAccount() {
  const employee = getEmployee();
  const [aadhar, setAadhar] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [formError, setFormError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!/^\d{12}$/.test(aadhar)) {
      setFieldError('Aadhar must be exactly 12 digits.');
      return;
    }

    setFieldError('');
    setConfirming(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/accounts/${aadhar}`, {
        auth: { username: employee.email, password: employee.password },
      });
      toast.success('Account deleted', `The account for Aadhar ${aadhar} has been removed.`);
      setAadhar('');
    } catch (err) {
      const message = errorMessage(err, 'Failed to delete the account.');
      setFormError(message);
      toast.error('Delete failed', message);
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg px-5 py-10">
      <PageHeader
        title="Manage accounts"
        subtitle="Close a customer account by their Aadhar number."
      />

      <Card className="animate-fade-up">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FormError message={formError} />

          <div className="flex gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="mt-px h-5 w-5 shrink-0 text-amber-600"
              aria-hidden="true"
            >
              <path d="M12 9v4" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
            </svg>
            <p className="text-sm text-amber-800">
              Deleting an account is permanent. The customer&apos;s balance and details cannot be
              recovered.
            </p>
          </div>

          <Field
            label="Customer's Aadhar number"
            name="aadhar"
            inputMode="numeric"
            placeholder="12 digits"
            value={aadhar}
            onChange={(e) => {
              setAadhar(e.target.value.replace(/\D/g, '').slice(0, 12));
              setFieldError('');
            }}
            error={fieldError}
            hint={`${aadhar.length}/12 digits`}
          />

          <Button type="submit" variant="danger" className="w-full">
            Delete account
          </Button>
        </form>
      </Card>

      <ConfirmDialog
        open={confirming}
        title="Delete this account?"
        message={`This will permanently close the account linked to Aadhar ${aadhar}. This cannot be undone.`}
        confirmLabel="Yes, delete it"
        loading={loading}
        onConfirm={confirmDelete}
        onCancel={() => setConfirming(false)}
      />
    </main>
  );
}
