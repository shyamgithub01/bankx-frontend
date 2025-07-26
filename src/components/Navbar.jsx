import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const employee = JSON.parse(localStorage.getItem('employee'));
  const admin = JSON.parse(localStorage.getItem('admin'));

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('employee');
    localStorage.removeItem('admin');
    navigate('/login');
  };

  return (
    <>
      <nav className="nav-container">
        {!user && !employee && !admin && (
          <>
            <Link className="nav-link" to="/login">User Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/employee-login">Employee Login</Link>
            <Link className="nav-link" to="/admin-login">Admin Login</Link>
          </>
        )}

        {user && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
        {user && <Link className="nav-link" to="/deposit">Deposit</Link>}
        {user && <Link className="nav-link" to="/transfer">Transfer</Link>}
        {/* {user && <Link className="nav-link" to="/balance">Balance</Link>} */}
        {admin && <Link className="nav-link" to="/add-employee">Add Employee</Link>}
        {employee && <Link className="nav-link" to="/delete-account">Delete Account</Link>}
        {(user || employee || admin) && (
          <button className="logout-button" onClick={logout}>Logout</button>
        )}
      </nav>

      <style>{`
        .nav-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(to right, #f0f4ff, #e0ecff);
          border-bottom: 2px solid #c7d2fe;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.15);
        }

        .nav-link {
          margin-right: 1rem;
          padding: 0.5rem 1rem;
          text-decoration: none;
          font-weight: 600;
          color: #1d4ed8;
          background-color: #e0f2fe;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          background-color: #bfdbfe;
          color: #1e3a8a;
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
        }

        .logout-button {
          margin-left: auto;
          padding: 0.5rem 1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(to right, #ef4444, #dc2626);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          background: linear-gradient(to right, #dc2626, #991b1b);
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);
        }

        .logout-button:active {
          transform: scale(0.95);
        }

        @media (max-width: 600px) {
          .nav-container {
            flex-direction: column;
            gap: 0.5rem;
          }

          .logout-button {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
}
