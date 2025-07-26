import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/accounts/login/user', { email, password });
      localStorage.setItem(
        'user',
        JSON.stringify({
          email,
          password,
          account_number: res.data.account_number,
        })
      );
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <>
      <div className="bank-login-container">
        <div className="bank-banner">
          <h2>Personal Banking</h2>
          
        </div>

        <form className="bank-login-form" onSubmit={handleSubmit}>
          <h3>Login to Your Account</h3>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Continue to Login</button>
          <button
            type="button"
            className="register-btn"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </form>

        <div className="bank-note">
          <p>By clicking on "Continue to Login", you agree to the Terms of Service of this app.</p>
        </div>

        <div className="safety-section">
          <div className="safety-cards">
            <div className="safety-card green">
              <div>😊</div>
              <h4>ALWAYS</h4>
              <p>keep your computer free of malware</p>
            </div>
            <div className="safety-card green">
              <div>😊</div>
              <h4>ALWAYS</h4>
              <p>change your passwords periodically</p>
            </div>
            <div className="safety-card red">
              <div>😠</div>
              <h4>NEVER</h4>
              <p>respond to any communication seeking your passwords</p>
            </div>
            <div className="safety-card red">
              <div>😠</div>
              <h4>NEVER</h4>
              <p>reveal your passwords or card details to anyone</p>
            </div>
          </div>

          <h3 className="security-heading">FOR YOUR OWN SECURITY</h3>

          <div className="security-boxes">
            <div className="security-box">
              <h4>Please ensure the following before logging in:</h4>
              <ul>
                <li>The URL in your browser address bar begins with "https".</li>
                <li>The address or status bar displays the padlock symbol.</li>
                <li>Click the padlock to view and verify the security certificate.</li>
                <li>SSL is compatible with IE 7+, Firefox 3.1+, Opera 9.5+, Safari 3.5+, Chrome.</li>
              </ul>
            </div>
            <div className="security-box">
              <h4>Beware of Phishing attacks</h4>
              <ul>
                <li>Phishing is a fraudulent attempt to steal personal info via email, call, or SMS.</li>
                <li>We never ask for passwords, OTPs, or sensitive details via phone or email.</li>
                <li>Never click suspicious links. Report phishing to <strong>report.phishing@sbi.co.in</strong>.</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="bank-footer">
          <p>MyBank (APM Id: Serv_Tran_552)</p>
          <p>Site best viewed at 1024x768 in Microsoft Edge 79+, Mozilla 96+, Chrome 97+</p>
        </footer>
      </div>

      <style>{`
        .bank-login-container {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', sans-serif;
          background: #f8f9fa;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
        }

        .bank-banner {
          background: linear-gradient(to right, #c6e6fb, #e3f2fd);
          padding: 1.5rem;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }

        .bank-banner h2 {
          color: #0b5394;
          margin-bottom: 0.3rem;
        }

        .bank-banner p {
          color: #1d3557;
          font-size: 0.95rem;
        }

        .bank-login-form {
          padding: 2rem 1.5rem;
          background: white;
          max-width: 500px;
          margin: auto;
        }

        .bank-login-form h3 {
          color: #0b5394;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .bank-login-form label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          color: #1f2937;
        }

        .bank-login-form input {
          width: 90%;
          padding: 0.7rem;
          margin-bottom: 1.5rem;
          border: 1px solid #cbd5e1;
          border-radius: 5px;
          font-size: 1rem;
        }

        .login-btn, .register-btn {
          width: 100%;
          padding: 0.8rem;
          margin-top: 0.4rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn {
          background: #0b5394;
          color: white;
        }

        .login-btn:hover {
          background: #063970;
        }

        .register-btn {
          background: #e0f0ff;
          color: #0b5394;
          border: 1px solid #90cdf4;
        }

        .register-btn:hover {
          background: #cce4fb;
        }

        .bank-note {
          text-align: center;
          padding: 1rem;
          font-size: 0.85rem;
          color: #4b5563;
          background: #f1f5f9;
        }

        .safety-section {
          margin-top: 2rem;
          padding: 1rem;
          background: #fff;
          border-top: 1px solid #e5e7eb;
        }

        .safety-cards {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .safety-card {
          flex: 1 1 220px;
          background: #f9fafb;
          border: 1px solid #d1d5db;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .safety-card.green h4 {
          color: green;
        }

        .safety-card.red h4 {
          color: red;
        }

        .security-heading {
          text-align: center;
          font-size: 1.2rem;
          color: #1e3a8a;
          margin-bottom: 1rem;
          border-bottom: 2px solid #1e3a8a;
          display: inline-block;
        }

        .security-boxes {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .security-box {
          flex: 1 1 45%;
          background: #f9fafb;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 5px;
        }

        .security-box h4 {
          margin-bottom: 0.75rem;
          color: #0b5394;
        }

        .security-box ul {
          padding-left: 1.25rem;
        }

        .security-box li {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .bank-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.75rem;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
          padding-top: 0.75rem;
        }

        @media screen and (max-width: 768px) {
          .safety-cards {
            flex-direction: column;
          }

          .security-boxes {
            flex-direction: column;
          }

          .bank-login-form {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
