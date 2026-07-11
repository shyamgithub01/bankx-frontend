import { useState, useEffect } from 'react';
import { api } from '../api/client';

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
      try {
        const res = await api.get('/accounts/balance', {
          params: { email: user.email, password: user.password }
        });
        setBalance(res.data.balance);
      } catch (err) {
        console.error(err);
        setError('Unable to fetch balance');
      }
    }

    load();
  }, []);

  return (
    <>
      <div className="balance-container">
        <div className="balance-banner">
          <h2>Your Balance</h2>
          <p>Track your current account balance</p>
        </div>

        <div className="balance-content">
          {error ? (
            <p className="balance-error">{error}</p>
          ) : balance === null ? (
            <p className="balance-loading">Loading…</p>
          ) : (
            <p className="balance-amount">₹{balance}</p>
          )}
        </div>
      </div>

      <style>{`
        .balance-container {
          max-width: 500px;
          margin: 2rem auto;
          font-family: 'Segoe UI', sans-serif;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          background: #f9fafb;
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
        }

        .balance-banner {
          background: linear-gradient(to right, #c6e6fb, #e3f2fd);
          padding: 1.5rem;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }

        .balance-banner h2 {
          color: #0b5394;
          margin-bottom: 0.3rem;
        }

        .balance-banner p {
          color: #1d3557;
          font-size: 0.95rem;
        }

        .balance-content {
          padding: 2rem;
          background: white;
          text-align: center;
        }

        .balance-loading {
          color: #4b5563;
          font-size: 1rem;
        }

        .balance-error {
          color: #dc2626;
          font-size: 1rem;
        }

        .balance-amount {
          color: #065f46;
          font-size: 2rem;
          font-weight: 700;
        }

        @media screen and (max-width: 600px) {
          .balance-container {
            margin: 1rem;
            border-radius: 8px;
          }

          .balance-banner h2 {
            font-size: 1.4rem;
          }

          .balance-content {
            padding: 1.5rem 1rem;
          }

          .balance-amount {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </>
  );
}
