import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//const API_URL = "https://openslot-server.adaptable.app";
const API_URL = "http://localhost:5005";

export default function Login() {
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
        // Save token or user data in localStorage or context
        localStorage.setItem("token", response.data.authToken);

        console.log("Login successful:", response);
        navigate("/dashboard"); // Navigate to a different page on successful login
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <h1 className="page-heading">Login</h1>
      <div>
        <form className="login-form">
          <div className="login-row">
            <label>Email:</label>
            <input type="text" value={email} onChange={handleEmail} />
          </div>
          <div className="login-row">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePassword} />
          </div>
          <div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
