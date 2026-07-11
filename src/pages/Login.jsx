import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api, errorMessage } from '../api/client';
import { setSession } from '../auth';
import { useToast } from '../components/toast-context';
import { AuthLayout, Button, Field, FormError } from '../components/ui';

export default function Login() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(
    location.state?.staleSession
      ? 'Your saved session was out of date. Please sign in again to continue.'
      : '',
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      const res = await api.post('/accounts/login/user', { email, password });
      setSession('user', {
        email,
        password,
        account_number: res.data.account_number,
        aadhar_card_number: res.data.aadhar_card_number,
        full_name: res.data.full_name,
      });
      toast.success('Welcome back', 'You are now signed in.');
      navigate('/dashboard');
    } catch (err) {
      const message = errorMessage(err, 'Login failed. Please try again.');
      setFormError(message);
      toast.error('Sign in failed', message);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Personal Banking"
      title="Sign in to your account"
      subtitle="Enter your details to access your dashboard."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
            Open one in minutes
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormError message={formError} />

        <Field
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <Field
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute top-8 right-3 text-slate-400 transition hover:text-slate-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              {showPassword ? (
                <>
                  <path
                    d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.4 5.2A9.6 9.6 0 0 1 12 5c5 0 9 4.5 9 7a11 11 0 0 1-2.2 3.2M6.2 6.7A11.4 11.4 0 0 0 3 12c0 2.5 4 7 9 7a9.9 9.9 0 0 0 3.4-.6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="2.75" strokeWidth="1.8" />
                </>
              )}
            </svg>
          </button>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 text-emerald-600">
            <path d="M12 3l7 3v5c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6l7-3Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="m9 12 2 2 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Staying safe online
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
          BankX will never ask for your password, OTP or card details over email, SMS or phone. Always
          check the padlock in your browser before signing in.
        </p>
      </div>

      <div className="mt-5 flex justify-center gap-4 text-xs text-slate-500">
        <Link to="/employee-login" className="hover:text-slate-700">
          Employee login
        </Link>
        <span aria-hidden="true">·</span>
        <Link to="/admin-login" className="hover:text-slate-700">
          Admin login
        </Link>
      </div>
    </AuthLayout>
  );
}
