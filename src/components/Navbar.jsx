import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/homepage">openSlot logo</Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/features">Features</Link>
        <Link to="/pricing">Pricing</Link>
      </div>

      {/* Buttons */}
      <div className="navbar-buttons">
        <button onClick={() => navigate("/signup")} className="navbar-button">
          Sign Up
        </button>
        <button onClick={() => navigate("/login")} className="navbar-button">
          Login
        </button>
      </div>
    </nav>
  );
}
