import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/accounts/login/user', { email, password });
      localStorage.setItem(
        'user',
        JSON.stringify({ email, password, account_number: res.data.account_number })
      );
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">User Login</h2>

        <label className="form-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" className="form-button">Login</button>
      </form>

      <style>{`
  .login-form {
    max-width: 400px;
    margin: 3rem auto;
    padding: 2.5rem;
    background: linear-gradient(135deg, #f3f4f6, #dbeafe);
    border-radius: 1.5rem;
    box-shadow: 0 10px 25px rgba(96, 165, 250, 0.2);
    transition: all 0.4s ease;
    transform: perspective(1000px) translateZ(0);
    font-family: sans-serif;
  }

  .form-title {
    text-align: center;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #1d4ed8;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2563eb;
    font-size: 0.95rem;
  }

  .form-input {
    width: 95%;
    padding: 0.75rem 1rem;
    margin-bottom: 1.5rem;
    border: 1px solid #bfdbfe;
    border-radius: 0.5rem;
    font-size: 1rem;
    color: #1e3a8a;
    background-color: white;
    transition: all 0.3s ease;
  }

  .form-input:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }

  .form-button {
    width: 100%;
    padding: 0.9rem;
    font-weight: 600;
    font-size: 1rem;
    color: white;
    background: linear-gradient(to right, #3b82f6, #2563eb);
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    transition: all 0.3s ease;
  }

  .form-button:hover {
    background: linear-gradient(to right, #2563eb, #1d4ed8);
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(59, 130, 246, 0.5);
  }

  .form-button:active {
    transform: scale(0.97);
  }

  @media (prefers-color-scheme: light) {
    .login-form {
      background: linear-gradient(135deg, #1f2937, #0f172a);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
    }
    .form-title {
      color: #dbeafe;
    }
    .form-label {
      color: #60a5fa;
    }
    .form-input {
      background-color: #111827;
      color: #f3f4f6;
      border-color: #4b5563;
    }
    .form-input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
    }
    .form-button {
      background: linear-gradient(to right, #2563eb, #1d4ed8);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
    }
    .form-button:hover {
      background: linear-gradient(to right, #1d4ed8, #2563eb);
    }
  }
`}</style>

    </>
  );
}
