import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, errorMessage } from '../api/client';
import { setSession } from '../auth';
import { useToast } from '../components/toast-context';
import { AuthLayout, Button, Field, FormError } from '../components/ui';

export default function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      const res = await api.post('/accounts/login/employee', { email, password });
      setSession('employee', { email, password, id: res.data.employee_id });
      toast.success('Signed in', 'Employee access granted.');
      navigate('/delete-account');
    } catch (err) {
      const message = errorMessage(err, 'Employee login failed.');
      setFormError(message);
      toast.error('Sign in failed', message);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Staff Portal"
      title="Employee sign in"
      subtitle="Secure access to manage customer accounts."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormError message={formError} />

        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@bankx.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" loading={loading} className="w-full">
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  );
}
