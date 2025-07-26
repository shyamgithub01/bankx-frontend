import { useState, useEffect } from 'react';
import { api } from '../api/client';

export default function Balance() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function load() {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const res = await api.get('/accounts/balance', {
          params: { email: user.email, password: user.password }
        });
        setBalance(res.data.balance);
      } catch {
        setBalance('Error fetching');
      }
    }
    load();
  }, []);

  return (
    <>
      <div className="balance-container">
        <h2 className="balance-title">Your Balance</h2>
        {balance !== null ? (
          <p className={`balance-amount ${balance === 'Error fetching' ? 'error' : ''}`}>
            {balance === 'Error fetching' ? 'Error fetching' : `₹${balance}`}
          </p>
        ) : (
          <p className="balance-loading">Loading...</p>
        )}
      </div>

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
          transform: perspective(1000px) translateZ(0);
        }

        .balance-container:hover {
          transform: perspective(1000px) translateZ(5px) scale(1.02);
          box-shadow: 0 12px 28px rgba(59, 130, 246, 0.3);
        }

        .balance-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #1d4ed8;
        }

        .balance-amount {
          font-size: 2rem;
          font-weight: 700;
          color: #065f46;
          transition: all 0.3s ease;
        }

        .balance-amount.error {
          color: #dc2626;
        }

        .balance-loading {
          font-size: 1.2rem;
          color: #4b5563;
        }
      `}</style>
    </>
  );
}
