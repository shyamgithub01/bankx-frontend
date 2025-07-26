import React from 'react';

const FirstPage = () => {
  const styles = {
    page: {
      backgroundColor: '#f0f4ff',
      color: '#0b5394',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      justifyContent: 'center',
    },
    leftColumn: {
      flex: '1 1 700px',
      maxWidth: '900px',
    },
    rightColumn: {
    
      flex: '1 1 300px',
      marginTop: '20px',
      minWidth: '280px',
    },
    title: {
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center',
      color: '#0b5394',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
      backgroundColor: '#f2f5f9',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    link: {
      color: '#c2185b',
      textDecoration: 'none',
      fontSize: '0.9rem',
    },
    viewAll: {
      textAlign: 'center',
      marginTop: '1.5rem',
    },
    rightTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    image: {
      width: '100%',
      borderRadius: '8px',
      marginBottom: '2rem',
    },
  };

  const leftCards = [
    { icon: '📄', label: 'Personal Loan', link: 'Know More' },
    { icon: '🏠', label: 'Home Loan', link: 'Know More' },
    { icon: '📄', label: 'Personal Loan EMI Calculator', link: 'Calculate Now' },
    { icon: '🏠', label: 'Home Loan EMI Calculator', link: 'Calculate Now' },
    { icon: '💳', label: 'Credit Card', link: 'Know More' },
    { icon: '📱', label: 'Open Digital Account', link: 'Know More' },
    { icon: '💰', label: 'Fixed Deposit Calculator', link: 'Calculate Now' },
    { icon: '📆', label: 'Credit Card EMI Calculator', link: 'Calculate Now' },
  ];

  return (
    <div style={styles.page}>
      {/* LEFT COLUMN */}
      <div style={styles.leftColumn}>
        <h1 style={styles.title}>Helping You Meet Your Life Goals</h1>
        <div style={styles.grid}>
          {leftCards.map((card, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.icon}>{card.icon}</div>
              <div style={styles.label}>{card.label}</div>
              <a href="#" style={styles.link}>{card.link}</a>
            </div>
          ))}
        </div>
        <div style={styles.viewAll}>
          <a href="#" style={styles.link}>View All</a>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div style={styles.rightColumn}>
        <h2 style={styles.rightTitle}>Navigate Scams, Unlock Support</h2>
        <img
          style={styles.image}
          src='/assets/about.png'
          alt="Fraud Awareness"
        />
        <h2 style={styles.rightTitle}>Multiple ways to bank at your convenience</h2>
       
      </div>
    </div>
  );
};

export default FirstPage;
