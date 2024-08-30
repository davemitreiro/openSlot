import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup({ createUser }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleName = (e) => setfullName(e.target.value);
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
      .post("https://openslot-server.adaptable.app/auth/signup", newUser)
      .then(function (response) {
        createUser(response.data);

        setfullName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="page-heading">Signup</h1>
      <div>
        <form className="add-form">
          <div className="add-row">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={fullName}
              onChange={handleName}
            />
          </div>
          <div className="add-row">
            <label>Type:</label>
            <input type="text" value={email} onChange={handleEmail} />
          </div>
          {/*<div className="add-row">
            <label>Image URL:</label>
            <input
              type="text"
              name="img"
              value={img}
              onChange={handleImgChange}
            />
          </div>*/}
          <div className="add-row">
            <label>Activities:</label>
            <input
              type="text"
              name="activities"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div>
            <button type="submit" onClick={handleSignUp}>
              Sign UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
