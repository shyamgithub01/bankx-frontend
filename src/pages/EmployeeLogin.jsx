import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/accounts/login/employee', { email, password });
      localStorage.setItem(
        'employee',
        JSON.stringify({ email, password, id: res.data.employee_id })
      );
      navigate('/delete-account');
    } catch {
      alert('Employee login failed');
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Employee Login</h2>

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
          background: linear-gradient(135deg, #f9fafb, #e0f2fe);
          border-radius: 1.5rem;
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.2);
          transition: all 0.4s ease;
          transform: perspective(1000px) translateZ(0);
        }

       

        .form-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #075985;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #0369a1;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          border: 1px solid #bae6fd;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #0c4a6e;
          background-color: white;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          border-color: #0284c7;
          outline: none;
          box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.3);
        }

        .form-button {
          width: 100%;
          padding: 0.9rem;
          font-weight: 600;
          font-size: 1rem;
          color: white;
          background: linear-gradient(to right, #0284c7, #0369a1);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);
          transition: all 0.3s ease;
        }

        .form-button:hover {
          background: linear-gradient(to right, #0369a1, #0c4a6e);
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(3, 105, 161, 0.5);
        }

        .form-button:active {
          transform: scale(0.97);
        }
      `}</style>
    </>
  );
}
