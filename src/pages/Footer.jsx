import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="custom-footer">
      <div className="footer-top">
        <div className="footer-header">
          <h2>MyBank Group</h2>
          <div className="footer-nav">
            <p>User</p>
            <p>Employee</p>
            <p>Admin</p>
          </div>
        </div>

        <div className="footer-sections">
          <div className="footer-column">
            <p>Who We Are</p>
            <p>News</p>
            <p>Careers</p>
            <p>Contact</p>
          </div>
          <div className="footer-column">
            <p>Countries</p>
            <p>Topics</p>
            <p>Projects & Operations</p>
            <p>Research & Publications</p>
          </div>
          <div className="footer-column">
            <p>Events</p>
            <p>Data</p>
            <p>Banking Academy</p>
            <p>Scorecard</p>
          </div>
          
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 MyBank Group. All Rights Reserved.</p>
        <div className="footer-links">
          <p>Legal</p>
          <p>Privacy Notice</p>
          <p>Site Accessibility</p>
          <p>Access to Information</p>
          <p>Scam Alert</p>
          <p>File a Complaint</p>
        </div>
      </div>

      <style>{`
        .custom-footer {
          background-color: #9dc7ecff;
          color: #0b5394;
          font-family: 'Segoe UI', sans-serif;
          padding: 2rem;
        }

        .footer-top {
          border-bottom: 1px solid #0b539455;
          padding-bottom: 2rem;
          margin-bottom: 1rem;
        }

        .footer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .footer-nav p {
          display: inline-block;
          margin: 0 1rem;
          font-weight: 500;
        }

        .footer-sections {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .footer-column {
          flex: 1;
          min-width: 160px;
          margin: 0.5rem;
        }

        .footer-column p {
          margin: 0.3rem 0;
          cursor: pointer;
        }

        .footer-subscribe {
          flex: 1;
          min-width: 220px;
          text-align: center;
          margin-top: 1rem;
        }

        .footer-subscribe h3 {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.3rem;
        }

        .footer-subscribe p {
          margin-bottom: 0.6rem;
        }

        .register-btn {
          padding: 0.6rem 1.4rem;
          background-color: #ffffff;
          color: #0b5394;
          border: none;
          border-radius: 50px;
          font-weight: bold;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .register-btn:hover {
          background-color: #d9ebf8;
          transform: scale(1.05);
        }

        .footer-bottom {
          text-align: center;
          font-size: 0.9rem;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .footer-links p {
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .footer-sections {
            flex-direction: column;
            align-items: center;
          }

          .footer-column,
          .footer-subscribe {
            text-align: center;
          }

          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
