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
    console.log("user credentials", userCredentials);

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
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const handleRoleClick = (e) => {
    e.preventDefault();
    selectRole();
  };
  /*
  return (
    <div style={{ marginTop: "200px" }}>
      <h1 className="page-heading">Login</h1>
      <div>
        <form className="login-form">
          <div className="login-row">
            <button className="login-role" onClick={handleRoleClick}>
              {role === "user" ? "Switch to pro" : "Switch to user"}
            </button>
            <div></div>
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
}*/

  return (
    <div style={{ marginTop: "200px" }} className="container mx-auto mt-20">
      {" "}
      {/* Centered container with top margin */}
      <h1 className="text-3xl font-bold mb-8">Login</h1>{" "}
      {/* Heading with styles */}
      <div className="flex justify-center">
        {" "}
        {/* Center the form */}
        <form className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-5">
          {/* Login role button */}
          <button
            className="w-full py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md"
            onClick={handleRoleClick}
          >
            {role === "user" ? "Switch to pro" : "Switch to user"}
          </button>

          <div className="mt-6">
            {" "}
            {/* Spacing between role button and form fields */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmail}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={handleLogin}
                className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
