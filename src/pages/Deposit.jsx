import { useState } from 'react';
import { api } from '../api/client';

export default function Deposit() {
  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/transactions/deposit', {
        aadhar_card_number: aadhar,
        password,
        amount: parseFloat(amount)
      });
      alert(`New balance: ₹${res.data.account.balance}`);
    } catch (err) {
      alert(err.response?.data?.detail || 'Error depositing');
    }
  };

  return (
    <>
      <form className="deposit-form" onSubmit={handle}>
        <h2 className="form-title">Deposit Funds</h2>

        <div>
          <label className="form-label">Aadhar Card #</label>
          <input
            type="text"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            required
            minLength={12}
            maxLength={12}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">Deposit</button>
      </form>

      <style>{`
        .deposit-form {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2.5rem;
          background: #f8fafc;
          border-radius: 1.5rem;
          // box-shadow: 0 10px 25px rgba(34, 197, 94, 0.2);
          transition: all 0.4s ease;
          transform: perspective(1000px) translateZ(0);
        }

        

        .form-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #065f46;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #047857;
        }

        .form-input {
          width: 95%;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          border: 1px solid #bbf7d0;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #064e3b;
          background-color: white;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          border-color: #10b981;
          outline: none;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
        }

        .form-button {
          width: 100%;
          padding: 0.9rem;
          font-weight: 600;
          font-size: 1rem;
          color: white;
          background: linear-gradient(to right, #10b981, #059669);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          transition: all 0.3s ease;
        }

        .form-button:hover {
          background: linear-gradient(to right, #059669, #047857);
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(5, 150, 105, 0.5);
        }

        .form-button:active {
          transform: scale(0.97);
        }
      `}</style>
    </>
  );
}
