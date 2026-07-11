import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, errorMessage } from '../api/client';
import { setSession } from '../auth';
import { useToast } from '../components/toast-context';
import { AuthLayout, Button, Field, FormError } from '../components/ui';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
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
      // Verify against the server before trusting the credentials: the admin
      // endpoints use HTTP Basic, so a bad pair must fail here, not later.
      await api.get('/accounts/login/admin', { auth: { username, password } });
      setSession('admin', { username, password });
      toast.success('Signed in', 'Admin access granted.');
      navigate('/add-employee');
    } catch (err) {
      const message = errorMessage(err, 'Admin login failed.');
      setFormError(message);
      toast.error('Sign in failed', message);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Administration"
      title="Admin sign in"
      subtitle="Authorised staff only. All activity is logged."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormError message={formError} />

        <Field
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          {loading ? 'Verifying…' : 'Sign in as admin'}
        </Button>
      </form>
    </AuthLayout>
  );
}
