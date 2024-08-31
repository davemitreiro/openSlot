// SignupProPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://openslot-server.adaptable.app";

export default function SignupProPage({ createPro }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleFullName = (e) => setFullName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const newPro = {
      role: "pro",
      data: {
        fullName,
        email,
        password,
      },
    };

    axios
      .post(`${API_URL}/auth/signup`, newPro)
      .then((response) => {
        createPro(response.data);
        setFullName("");
        setEmail("");
        setPassword("");
        navigate("/"); // Redirect after successful signup
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        alert("Sign up failed. Please try again.");
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1 className="page-heading">Sign Up as Pro</h1>
      <div>
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="form-row">
            <label>Company/Business or Your Name:</label>
            <input type="text" value={fullName} onChange={handleFullName} />
          </div>
          <div className="form-row">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmail} />
          </div>
          <div className="form-row">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePassword} />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
