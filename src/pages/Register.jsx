import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, errorMessage } from '../api/client';
import { useToast } from '../components/toast-context';
import { AuthLayout, Button, Field, FormError, Select } from '../components/ui';
import { isEmail } from '../validation';

const EMPTY = {
  full_name: '',
  email: '',
  age: '',
  aadhar_card_number: '',
  mobile_number: '',
  password: '',
  account_type: 'savings',
};

function validate(form) {
  const errors = {};

  if (!form.full_name.trim()) errors.full_name = 'Enter your full name.';
  if (!isEmail(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.age || Number(form.age) < 18) errors.age = 'You must be at least 18 years old.';
  if (!/^\d{12}$/.test(form.aadhar_card_number))
    errors.aadhar_card_number = 'Aadhar must be exactly 12 digits.';
  if (!/^\d{10}$/.test(form.mobile_number))
    errors.mobile_number = 'Mobile number must be exactly 10 digits.';
  if (form.password.length < 8) errors.password = 'Password must be at least 8 characters.';

  return errors;
}

export default function Register() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const update = (name) => (e) => {
    let { value } = e.target;

    // Aadhar and mobile are digit-only, fixed-length fields — stop bad input at the source.
    if (name === 'aadhar_card_number') value = value.replace(/\D/g, '').slice(0, 12);
    if (name === 'mobile_number') value = value.replace(/\D/g, '').slice(0, 10);

    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      toast.error('Check the form', 'Some details need fixing before we can continue.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/accounts/', { ...form, age: parseInt(form.age, 10) });
      toast.success(
        'Account created',
        `Your account number is ${res.data.account_number}. Please sign in.`,
      );
      navigate('/login');
    } catch (err) {
      const message = errorMessage(err, 'Registration failed. Please try again.');
      setFormError(message);
      toast.error('Registration failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Open an account"
      title="Create your BankX account"
      subtitle="It only takes a minute. No paperwork required."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormError message={formError} />

        <Field
          label="Full name"
          name="full_name"
          placeholder="Amit Sharma"
          value={form.full_name}
          onChange={update('full_name')}
          error={errors.full_name}
        />

        <Field
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Age"
            name="age"
            type="number"
            min="18"
            placeholder="18"
            value={form.age}
            onChange={update('age')}
            error={errors.age}
          />

          <Select
            label="Account type"
            name="account_type"
            value={form.account_type}
            onChange={update('account_type')}
          >
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </Select>
        </div>

        <Field
          label="Aadhar card number"
          name="aadhar_card_number"
          inputMode="numeric"
          placeholder="12 digits"
          value={form.aadhar_card_number}
          onChange={update('aadhar_card_number')}
          error={errors.aadhar_card_number}
          hint={`${form.aadhar_card_number.length}/12 digits`}
        />

        <Field
          label="Mobile number"
          name="mobile_number"
          inputMode="numeric"
          placeholder="10 digits"
          value={form.mobile_number}
          onChange={update('mobile_number')}
          error={errors.mobile_number}
          hint={`${form.mobile_number.length}/10 digits`}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
        />

        <Button type="submit" loading={loading} className="w-full">
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  );
}
