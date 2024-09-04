import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

//const API_URL = "https://openslot-server.adaptable.app";

export default function Signup({ createUser }) {
  const { role, selectRole, API_URL } = useContext(AuthContext);

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
  /*
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
}*/
  return (
    <div style={{ marginTop: "200px" }} className="container mx-auto mt-20">
      {" "}
      {/* Centered container with top margin */}
      <h1 className="text-3xl font-bold mb-8">Sign Up</h1>{" "}
      {/* Heading with styles */}
      <div className="flex justify-center">
        {" "}
        {/* Center the form */}
        <form
          className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-5"
          onSubmit={handleSignUp}
        >
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
                htmlFor="name"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={fullName}
                onChange={handleFullName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmail}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
focus:ring-2 focus:ring-blue-400"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   
rounded-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
