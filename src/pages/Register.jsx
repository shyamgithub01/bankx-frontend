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
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>

        <label className="form-label">Full Name</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="form-input" />

        <label className="form-label">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />

        <label className="form-label">Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="18" required className="form-input" />

        <label className="form-label">Aadhar Card #</label>
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

     <style>{`
  .register-form {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: linear-gradient(135deg, #f9fafb, #e0f2fe);
    border-radius: 1.5rem;
    box-shadow: 0 10px 25px rgba(2, 132, 199, 0.2);
    transition: all 0.4s ease;
    transform: perspective(1000px) translateZ(0);
    font-family: sans-serif;
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
    font-size: 0.95rem;
    color: #0369a1;
  }

  .form-input {
    width: 95%;
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
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(3, 105, 161, 0.5);
  }

  .form-button:active {
    transform: scale(0.97);
  }

  @media (prefers-color-scheme: light) {
    .register-form {
      background: linear-gradient(135deg, #1f2937, #0f172a);
      box-shadow: 0 10px 25px rgba(3, 105, 161, 0.4);
    }
    .form-title {
      color: #e0f2fe;
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
      background: linear-gradient(to right, #0369a1, #075985);
      box-shadow: 0 4px 12px rgba(3, 105, 161, 0.6);
    }
    .form-button:hover {
      background: linear-gradient(to right, #075985, #0c4a6e);
    }
  }
`}</style>
    </>
  );
}
