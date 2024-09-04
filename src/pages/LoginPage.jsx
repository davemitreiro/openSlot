import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

export default function Login() {
  const { role, selectRole, API_URL, saveUserInfo, isLoggedIn } =
    useContext(AuthContext);
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
      role: role,
      data: { email, password },
    };

    axios
      .post(`${API_URL}/auth/login`, userCredentials)
      .then((response) => {
        // Save token or user data in localStorage or context
        saveUserInfo(response);
        console.log("Login successful:", response);
        // No need to navigate here, let useEffect handle it
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  // Redirect to the dashboard when the user successfully logs in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleRoleClick = (e) => {
    e.preventDefault();
    selectRole();
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <h1 className="page-heading">Login</h1>
      <div>
        <form className="login-form">
          <div className="login-row">
            <button className="login-role" onClick={handleRoleClick}>
              {role === "user" ? "Switch to professional" : "Switch to user"}
            </button>
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
