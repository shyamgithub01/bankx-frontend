import { useState } from 'react';
import { api, errorMessage } from '../api/client';
import { getAdmin } from '../auth';
import { useToast } from '../components/toast-context';
import { Button, Card, Field, FormError, PageHeader } from '../components/ui';
import { isEmail } from '../validation';

export default function AddEmployee() {
  const admin = getAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const found = {};
    if (!isEmail(email)) found.email = 'Enter a valid email address.';
    if (password.length < 8) found.password = 'Password must be at least 8 characters.';

    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setLoading(true);
    try {
      await api.post(
        '/accounts/employees',
        { email, password },
        { auth: { username: admin.username, password: admin.password } },
      );
      toast.success('Employee added', `${email} can now sign in to the staff portal.`);
      setEmail('');
      setPassword('');
      setErrors({});
    } catch (err) {
      const message = errorMessage(err, 'Failed to add the employee.');
      setFormError(message);
      toast.error('Could not add employee', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg px-5 py-10">
      <PageHeader
        title="Add an employee"
        subtitle="Create staff credentials for the employee portal."
      />

      <Card className="animate-fade-up">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FormError message={formError} />

          <Field
            label="Work email"
            name="email"
            type="email"
            autoComplete="off"
            placeholder="employee@bankx.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
            error={errors.email}
          />

          <Field
            label="Temporary password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((p) => ({ ...p, password: undefined }));
            }}
            error={errors.password}
            hint="Share this with the employee so they can sign in."
          />

          <Button type="submit" loading={loading} className="w-full">
            {loading ? 'Adding…' : 'Add employee'}
          </Button>
        </form>
      </Card>
    </main>
  );
}
