import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

export default function Component() {
  const { role, selectRole, API_URL } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleFullName = (e) => setFullName(e.target.value);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, contain one number, one lowercase and one uppercase letter"
      );
      isValid = false;
    }

    if (!isValid) return;

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
        console.log(response);
        setFullName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occurred during signup. Please try again.");
      });
  };

  const handleRoleClick = (e) => {
    e.preventDefault();
    selectRole();
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
      <div className="flex justify-center">
        <form
          className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-6"
          onSubmit={handleSignUp}
        >
          <button
            className="w-full py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md"
            onClick={handleRoleClick}
            type="button"
          >
            {role === "user" ? "Switch to pro" : "Switch to user"}
          </button>

          <div className="mt-6">
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
                required
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  emailError ? "border-red-500" : ""
                }`}
                required
                placeholder="example@example.com"
              />
              {emailError && (
                <p className="text-red-500 text-xs italic mt-1">{emailError}</p>
              )}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  passwordError ? "border-red-500" : ""
                }`}
                required
                placeholder="At least: 6 chars, 1 number, 1 lowercase, 1 uppercase"
              />
              {passwordError ? (
                <p className="text-red-500 text-xs italic mt-1">
                  {passwordError}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long, contain one
                  number, one lowercase and one uppercase letter
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
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
