import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Balance() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) {
      setError('No user in storage');
      return;
    }

    let user;
    try {
      user = JSON.parse(raw);
    } catch {
      setError('Invalid user data');
      return;
    }

    if (!user.email || !user.password) {
      setError('Missing credentials');
      return;
    }

    async function load() {
      const url = `https://backend-5z27.onrender.com/accounts/balance`;
      console.log('Fetching balance from:', url, 'with', user);
      try {
        const res = await axios.get(url, {
          params: { email: user.email, password: user.password }
        });
        console.log('Balance response:', res.data);
        setBalance(res.data.balance);
      } catch (err) {
        console.error('Balance error:', err);
        setError('Unable to fetch balance');
      }
    }

    load();
  }, []);

  if (error) {
    return <p className="balance-error">{error}</p>;
  }

  return (
    <div className="balance-container">
      <h2 className="balance-title">Your Balance</h2>
      {balance === null ? (
        <p className="balance-loading">Loading…</p>
      ) : (
        <p className="balance-amount">₹{balance}</p>
      )}

      <style>{`
        .balance-container {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2.5rem;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, #ffffff, #f0f9ff);
          box-shadow: 0 8px 20px rgba(0, 112, 243, 0.15);
          text-align: center;
          transition: all 0.4s ease;
        }
        .balance-loading {
          color: #4b5563;
        }
        .balance-error {
          color: #dc2626;
          text-align: center;
          margin-top: 2rem;
        }
        .balance-amount {
          font-size: 2rem;
          font-weight: 700;
          color: #065f46;
        }
      `}</style>
    </div>
  );
}
