import { useState } from 'react';
import { api } from '../api/client';

export default function AddEmployee() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const admin = JSON.parse(localStorage.getItem('admin'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/accounts/employees',
        { email, password },
        {
          auth: { username: admin.username, password: admin.password }
        }
      );
      alert('Employee added successfully');
      setEmail('');
      setPassword('');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to add employee');
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="form-header">
          <h2>Add New Employee</h2>
          <p>Securely create login credentials for your staff.</p>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
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

          <button type="submit" className="form-button">
            Add Employee
          </button>
        </form>
      </div>

      <style>{`
        .form-wrapper {
          max-width: 500px;
          margin: 2rem auto;
          font-family: 'Segoe UI', sans-serif;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          background: #f9fafb;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
        }

        .form-header {
          background: linear-gradient(to right, #c6e6fb, #e3f2fd);
          padding: 1.5rem;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }

        .form-header h2 {
          color: #0b5394;
          margin-bottom: 0.3rem;
        }

        .form-header p {
          color: #1e3a8a;
          font-size: 0.95rem;
        }

        .form-container {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          background: white;
        }

        .form-label {
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #1d4ed8;
        }

        .form-input {
          width: 90%;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          border: 1px solid #93c5fd;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #1e40af;
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
          background: linear-gradient(to right, #2563eb, #4f46e5);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
          transition: all 0.3s ease;
        }

        .form-button:hover {
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(79, 70, 229, 0.5);
        }

        .form-button:active {
          transform: scale(0.97);
        }

        @media screen and (max-width: 600px) {
          .form-wrapper {
            margin: 1rem;
            border-radius: 8px;
          }

          .form-container {
            padding: 1.5rem 1rem;
          }

          .form-header h2 {
            font-size: 1.4rem;
          }

          .form-input {
            width: 90%;
            font-size: 0.95rem;
          }

          .form-button {
            font-size: 0.95rem;
            padding: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}
