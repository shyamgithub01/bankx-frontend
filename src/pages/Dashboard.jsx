import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const loadBalance = () => {
    axios
      .get("http://localhost:8000/accounts/balance", {
        params: formData
      })
      .then((res) => setBalance(res.data.balance))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- inline style definitions ---
  const styles = {
    card: {
      maxWidth: "400px",
      margin: "2rem auto",
      padding: "2rem",
      backgroundColor: "#f8fcff",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
    },
    title: {
      marginBottom: "1.5rem",
      textAlign: "center",
      color: "#0b4f6c"
    },
    formGroup: {
      marginBottom: "1rem"
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #dde4eb",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none"
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#008ecf",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer"
    },
    balance: {
      textAlign: "center",
      fontSize: "1.1rem",
      color: "#0b4f6c",
      marginTop: "1rem"
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Bank Account Dashboard</h2>

      <div style={styles.formGroup}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <button onClick={loadBalance} style={styles.button}>
        Get Balance
      </button>

      {balance !== null && (
        <p style={styles.balance}>Balance: ₹{balance}</p>
      )}
    </div>
  );
};

export default Dashboard;
