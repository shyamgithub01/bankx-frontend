import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <div className="nav-header">
          <Link to="/">
  <img
    src="/assets/logo1.png"
    alt="Bank Logo"
    style={{
      borderRadius: '50%',
      width: '100px',
      height: '100px',
    }}
  />
</Link>
            <Link className="nav-link" to="/login">User Login</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            &#x2630;
          </button>
        </div>

        <div className={`nav-links ${menuOpen ? 'show' : ''}`}>

    
          <Link className="nav-link" to="/">Home</Link>

          {!user && !employee && !admin && (
            <>
              
              <Link className="nav-link" to="/register">Register</Link>
              <Link className="nav-link" to="/employee-login">Employee Login</Link>
              <Link className="nav-link" to="/admin-login">Admin Login</Link>
            </>
          )}

          {user && (
            <>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
              <Link className="nav-link" to="/deposit">Deposit</Link>
              <Link className="nav-link" to="/transfer">Transfer</Link>
            </>
          )}

          {admin && <Link className="nav-link" to="/add-employee">Add Employee</Link>}
          {employee && <Link className="nav-link" to="/delete-account">Delete Account</Link>}

          {(user || employee || admin) && (
            <button className="logout-button" onClick={logout}>Logout</button>
          )}
        </div>
      </nav>

      <style>{`
        .nav-container {
          background: linear-gradient(to right, #f0f4ff, #e0ecff);
          border-bottom: 2px solid #c7d2fe;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.15);
        }

        .nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
        }

        .nav-logo {
          font-size: 1.4rem;
          font-weight: bold;
          color: #1d4ed8;
        }

        .hamburger {
          display: none;
          font-size: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #1e3a8a;
        }

        .nav-links {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 0 1rem 1rem 1rem;
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
        }

        .logout-button {
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
        }

        @media (max-width: 600px) {
          .hamburger {
            display: block;
          }

          .nav-links {
            display: none;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .nav-links.show {
            display: flex;
          }

          .nav-link,
          .logout-button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
