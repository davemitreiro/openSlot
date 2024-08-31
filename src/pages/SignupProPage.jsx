import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const API_URL = "https://openslot-server.adaptable.app";
const API_URL = "http://localhost:5005";

export default function Signup({ createPro }) {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleCompanyName = (e) => setCompanyName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!companyName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const newPro = {
      role: "pro",
      data: {
        email,
        password,
      },
    };

    axios
      .post(`${API_URL}/auth/signup`, newPro)
      .then(function (response) {
        createPro(response.data);
        console.log(response);

        // Reset the form fields
        setCompanyName("");
        setEmail("");
        setPassword("");

        // Navigate to the home page after successful signup
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <h1 className="page-heading">Sign Up</h1>
      <div>
        <form className="add-form" onSubmit={handleSignUp}>
          <div className="add-row">
            <label>Company/Business or your name:</label>
            <input
              type="text"
              name="name"
              value={companyName}
              onChange={handleCompanyName}
            />
          </div>
          <div className="add-row">
            <label>Email</label>
            <input type="email" onChange={handleEmail} value={email} />
          </div>
          <div className="add-row">
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
