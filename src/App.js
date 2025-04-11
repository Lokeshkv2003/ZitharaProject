import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    occasion: "",
    interests: "",
  });

  const [suggestion, setSuggestion] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/suggest", form);
      setSuggestion(res.data.suggestion);
    } catch (err) {
      console.error("Frontend error:", err.message);
      setSuggestion("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <span role="img" aria-label="gift">🎁</span> Gift Recommendation
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Recipient Name" onChange={handleChange} required style={styles.input} />
          <input name="age" placeholder="Age" onChange={handleChange} required style={styles.input} />
          <input name="occasion" placeholder="Occasion" onChange={handleChange} required style={styles.input} />
          <input name="interests" placeholder="Interests" onChange={handleChange} required style={styles.input} />
          <button type="submit" style={styles.button}>Get Suggestion</button>
        </form>

        {suggestion && (
          <p style={styles.result}>
            <span role="img" aria-label="gift">🎁</span> {suggestion}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f7f7ff",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "450px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "#ff6f61",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  result: {
    marginTop: "20px",
    background: "#e8f5e9",
    padding: "15px",
    borderRadius: "8px",
    color: "#2e7d32",
    fontWeight: "500",
  },
};

export default App;
