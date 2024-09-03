import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RoleContext } from "../../context/role.context";

const API_URL = "https://openslot-server.adaptable.app";

export default function Signup({ createUser }) {
  const { role, selectRole } = useContext(RoleContext);

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

    //MISSING IMG
    const newUser = {
      role: role,
      data: {
        fullName,
        email,
        password,
      },
    };

    axios
      .post(`${API_URL}/auth/signup`, newUser)
      .then(function (response) {
        createUser(response.data);
        console.log(response);

        // Reset the form fields
        setFullName("");
        setEmail("");
        setPassword("");

        // Navigate to the home page after successful signup
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRoleClick = (e) => {
    e.preventDefault();
    selectRole();
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <h1 className="page-heading">Sign Up</h1>
      <div>
        <form className="add-form" onSubmit={handleSignUp}>
          <div className="add-row">
            <button className="login-role" onClick={handleRoleClick}>
              {role === "user" ? "Switch to pro" : "Switch to user"}
            </button>
            <div></div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={fullName}
              onChange={handleFullName}
            />
          </div>
          <div className="add-row">
            <label>Email:</label>
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
