// LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://openslot-server.adaptable.app";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const userCredentials = {
      email,
      password,
    };

    axios
      .post(`${API_URL}/auth/login`, userCredentials)
      .then((response) => {
        const { role, authToken } = response.data;
        localStorage.setItem("token", authToken);

        if (role === "pro") {
          navigate("/pro-dashboard");
        } else {
          navigate("/dashboard");
        }

        console.log("Login successful:", response);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1 className="page-heading">Login</h1>
      <div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-row">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmail} />
          </div>
          <div className="form-row">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePassword} />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
