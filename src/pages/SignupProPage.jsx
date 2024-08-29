import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup({ createUser }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlefullName = (e) => setName(e.target.value);
  const handleEmail = (e) => setType(e.target.value);
  const handlePassword = (e) => setImg(e.target.value);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
    };

    axios
      .post("https://roamio.adaptable.app/locations", newUser)
      .then(function (response) {
        createUser(response.data);

        setFullName("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="page-heading">Sign Up</h1>
      <div>
        <form className="add-form">
          <div className="add-row">
            <label>Company/Business or your name:</label>
            <input
              type="text"
              name="name"
              value={fullName}
              onChange={handlefullName}
            />
          </div>
          <div className="add-row">
            <label>Email</label>
            <input type="text" onChange={handleEmail} value={email} />
          </div>
          <div className="add-row">
            <label>Password:</label>
            <textarea
              cols="40"
              type="text"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <div>
            <button type="submit" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
