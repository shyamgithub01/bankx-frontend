import { useState } from 'react';
import { api } from '../api/client';

export default function DeleteAccount() {
  const [aadhar, setAadhar] = useState('');
  const employee = JSON.parse(localStorage.getItem('employee'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/accounts/${aadhar}`, {
        auth: { username: employee.email, password: employee.password },
      });
      alert('Account deleted successfully');
      setAadhar('');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete account');
    }
  };

  return (
    <>
      <form className="delete-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Delete Account</h2>

        <label className="form-label">Aadhar Card #</label>
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          minLength={12}
          maxLength={12}
          required
          className="form-input"
        />

        <button type="submit" className="form-button danger">
          Delete Account
        </button>
      </form>

      <style>{`
        .delete-form {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2.5rem;
          background: linear-gradient(135deg, #fffafa, #ffeef0);
          border-radius: 1.5rem;
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.15);
          transition: all 0.4s ease;
          transform: perspective(1000px) translateZ(0);
          text-align: center;
        }

        .delete-form:hover {
          transform: perspective(1000px) translateZ(5px) scale(1.02);
          box-shadow: 0 12px 28px rgba(239, 68, 68, 0.25);
        }

        .form-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #991b1b;
        }

        .form-label {
          display: block;
          text-align: left;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #b91c1c;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          border: 1px solid #fecaca;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #7f1d1d;
          background-color: #fff;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          border-color: #ef4444;
          outline: none;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
        }

        .form-button {
          width: 100%;
          padding: 0.9rem;
          font-weight: 600;
          font-size: 1rem;
          color: white;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-button.danger {
          background: linear-gradient(to right, #ef4444, #dc2626);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }

        .form-button.danger:hover {
          background: linear-gradient(to right, #dc2626, #991b1b);
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(220, 38, 38, 0.5);
        }

        .form-button:active {
          transform: scale(0.97);
        }
      `}</style>
    </>
  );
}
