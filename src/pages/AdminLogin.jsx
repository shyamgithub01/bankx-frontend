import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('admin', JSON.stringify({ username, password }));
    navigate('/add-employee');
  };

  return (
    <>
      <div className="admin-login-container">
        <div className="admin-banner">
          <h2>Admin Login</h2>
          <p>Authorised access for account management only</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
            placeholder="Enter username"
          />

          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Enter password"
          />

          <button type="submit" className="form-button">Login</button>
        </form>
      </div>

      <style>{`
        .admin-login-container {
          max-width: 500px;
          margin: 2rem auto;
          font-family: 'Segoe UI', sans-serif;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          background: #f9fafb;
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
        }

        .admin-banner {
          background: linear-gradient(to right, #c6e6fb, #e3f2fd);
          padding: 1.5rem;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }

        .admin-banner h2 {
          color: #0b5394;
          margin-bottom: 0.3rem;
        }

        .admin-banner p {
          color: #1d3557;
          font-size: 0.95rem;
        }

        .login-form {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          background: white;
        }

        .form-label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #0369a1;
        }

        .form-input {
          width: 90%;
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

        @media screen and (max-width: 600px) {
          .admin-login-container {
            margin: 1rem;
            border-radius: 8px;
          }

          .login-form {
            padding: 1.5rem 1rem;
          }

          .admin-banner h2 {
            font-size: 1.4rem;
          }

          .form-input {
            width: 100%;
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
