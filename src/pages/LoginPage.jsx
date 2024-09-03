import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RoleContext } from "../../context/role.context";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005";

export default function Login({ id }) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;

  const { role, selectRole } = useContext(RoleContext);

  const { saveUserInfo } = useContext(AuthContext);

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
        console.log("response:", response);

        //localStorage.setItem("token", response.data.authToken);

        console.log("Login successful:", response);
        navigate(`/dashboard/${response.data.userData._id}`); // Navigate to a different page on successful login
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

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
              {role === "user" ? "Switch to pro" : "Switch to user"}
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
