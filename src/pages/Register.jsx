import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (aadhar.length !== 12 || mobile.length !== 10 || password.length < 8) {
      alert('Please ensure:\n- Aadhar is 12 digits\n- Mobile is 10 digits\n- Password is at least 8 characters');
      return;
    }

    try {
      const response = await api.post('/accounts', {
        full_name: fullName,
        email,
        age: parseInt(age, 10),
        aadhar_card_number: aadhar,
        mobile_number: mobile,
        password,
        account_type: accountType,
      });

      const { account_number } = response.data;
      alert(`Registration successful! Your account number is ${account_number}`);
      navigate('/login');
    } catch (err) {
      console.error('Backend Error:', err.response?.data);
      alert(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-banner">
          <h2>Open Your Bank Account</h2>
          <p>Join the nation's most trusted banking network.</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <h3 className="form-title">New Account Registration</h3>

          <label className="form-label">Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="form-input" />

          <label className="form-label">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />

          <label className="form-label">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="18" required className="form-input" />

          <label className="form-label">Aadhar Card Number</label>
          <input type="text" value={aadhar} onChange={(e) => setAadhar(e.target.value)} minLength={12} maxLength={12} required className="form-input" />

          <label className="form-label">Mobile Number</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} minLength={10} maxLength={10} required className="form-input" />

          <label className="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required className="form-input" />

          <label className="form-label">Account Type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)} className="form-input">
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </select>

          <button type="submit" className="form-button">Register</button>
        </form>
      </div>

      <style>{`
        .register-container {
          max-width: 700px;
          margin: 2rem auto;
          font-family: 'Segoe UI', sans-serif;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
          background: #f8f9fa;
        }

        .register-banner {
          background: linear-gradient(to right, #c6e6fb, #e3f2fd);
          padding: 1.5rem;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }

        .register-banner h2 {
          color: #0b5394;
          margin-bottom: 0.3rem;
        }

        .register-banner p {
          color: #1d3557;
          font-size: 0.95rem;
        }

        .register-form {
          padding: 2rem;
          background: white;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-title {
          text-align: center;
          font-size: 1.5rem;
          color: #0b5394;
          margin-bottom: 1rem;
        }

        .form-label {
          font-weight: 600;
          font-size: 0.95rem;
          color: #0369a1;
        }

        .form-input {
          width: 90%;
          padding: 0.75rem 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          font-size: 1rem;
          background-color: #ffffff;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus {
          border-color: #0284c7;
          outline: none;
          box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.3);
        }

        .form-button {
          width: 100%;
          padding: 0.9rem;
          font-size: 1rem;
          font-weight: 600;
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
          transform: scale(1.03);
        }

        .form-button:active {
          transform: scale(0.97);
        }

        @media screen and (max-width: 600px) {
          .register-form {
            padding: 1.5rem 1rem;
          }

          .form-title {
            font-size: 1.3rem;
          }

          .form-input {
            font-size: 0.95rem;
            padding: 0.6rem 0.9rem;
          }

          .form-button {
            padding: 0.8rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
