import React from 'react';
import Footer from './Footer'
import FirstPage from './FirstPage';
import Welcome from './Welcome';

export default function HomePage() {
  return (
    <>
        <Welcome/>
      <div className="">
        <div className="">
            
          <div className="banner-text">
            
            
          </div>
        </div>
        

        <div className="features">
          <div className="feature-card">
            <img src="/assets/security.png" alt="Secure Banking" />
            <h3>Secure Banking</h3>
            <p>Protected login and encrypted transactions to keep your money safe.</p>
          </div>
          <div className="feature-card">
            <img src="/assets/fraud.png" alt="Digital Safety" />
            <h3>Beware of Digital Scams</h3>
            <p>Always verify calls or messages before sharing any personal info.</p>
          </div>
          <div className="feature-card">
            <img src="/assets/support.png" alt="Support" />
            <h3>24/7 Support</h3>
            <p>Contact us anytime for help with your banking needs.</p>
          </div>
        </div>

        <div className="alert-box">
          <h2>⚠️ Stay Alert</h2>
          <ul>
            <li>Never share your OTP or passwords over phone.</li>
            <li>Watch out for fake video calls and police threats.</li>
            <li>Report fraud immediately to cybercrime helpline.</li>
          </ul>
          <p className="stay-safe">#StaySafeWithMyBank</p>
          
          

          
        </div>

        
      </div>
        <FirstPage />
      <Footer />
      

      

      <style>{`
        .homepage-container {
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to bottom right, #f0f4ff, #e6eeff);
          color: #0b5394;
          padding-bottom: 4rem;
        }

        .banner {
          background: linear-gradient(to right, #9dc7ecff, #9ac4e8ff);
          padding: 3rem 1rem;
          color: 0b5394;
          text-align: center;
        }

        .banner h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .banner p {
          font-size: 1.2rem;
        }

        .features {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 3rem auto;
          flex-wrap: wrap;
        }

        .feature-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          width: 280px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .feature-card img {
          height: 80px;
          margin-bottom: 1rem;
        }

        .alert-box {
          background: #fff7ed;
          border-left: 6px solid #facc15;
          margin: 0 auto;
          padding: 2rem;
          max-width: 700px;
          border-radius: 12px;
          margin-bottom : 60px;
        }

        .alert-box h2 {
          color: #b91c1c;
        }

        .alert-box ul {
          margin-top: 1rem;
          line-height: 1.8;
          list-style: disc;
          padding-left: 1.5rem;
        }

        .stay-safe {
          margin-top: 1rem;
          font-weight: bold;
          color: #c2410c;
          font-size: 1.1rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .features {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      
    </>

    
  );
}
