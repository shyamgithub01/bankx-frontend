import { useState } from 'react';
import { api } from '../api/client';

export default function Transfer() {
  const [toAadhar, setToAadhar] = useState('');
  const [acctNum, setAcctNum] = useState('');
  const [amount, setAmount] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user?.aadhar_card_number || !user?.password) {
      alert('Session expired or user not properly logged in.');
      return;
    }

    if (toAadhar.length !== 12 || acctNum.length !== 12) {
      alert('Receiver Aadhar and Account Number must be 12 digits.');
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert('Amount must be a positive number.');
      return;
    }

    try {
      const payload = {
        sender_aadhar_card_number: user.aadhar_card_number,
        password: user.password,
        receiver_aadhar_card_number: toAadhar,
        receiver_account_number: acctNum,
        amount: parseFloat(amount),
      };

      const res = await api.post('/transactions/transfer', payload);
      alert(`✅ Transferred successfully. New balance: ₹${res.data.sender.balance.toFixed(2)}`);
      setToAadhar('');
      setAcctNum('');
      setAmount('');
    } catch (err) {
      alert(err.response?.data?.detail || '❌ Transfer failed. Please try again.');
    }
  };

  return (
    <>
      <form className="transfer-form" onSubmit={handle}>
        <h2 className="form-title">Transfer Funds</h2>

        <label className="form-label">Receiver Aadhar</label>
        <input
          type="text"
          value={toAadhar}
          onChange={(e) => setToAadhar(e.target.value)}
          required
          minLength={12}
          maxLength={12}
          className="form-input"
        />

        <label className="form-label">Receiver Account #</label>
        <input
          type="text"
          value={acctNum}
          onChange={(e) => setAcctNum(e.target.value)}
          required
          minLength={12}
          maxLength={12}
          className="form-input"
        />

        <label className="form-label">Amount (₹)</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" className="form-button">Send</button>
      </form>

      <style>{`
        .transfer-form {
          max-width: 500px;
          margin: 3rem auto;
          padding: 2rem;
          background: #f8fafc;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .form-title {
          text-align: center;
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #0c4a6e;
        }

        .form-label {
          margin-bottom: 0.5rem;
          display: block;
          font-weight: 600;
          color: #0369a1;
        }

        .form-input {
          width: 95%;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          font-size: 1rem;
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
          background: #0284c7;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);
          transition: all 0.3s ease;
        }

        .form-button:hover {
          background: #0369a1;
        }

        .form-button:active {
          transform: scale(0.97);
        }
      `}</style>
    </>
  );
}
