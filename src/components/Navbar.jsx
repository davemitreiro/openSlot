import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import openSlotLogo from "../assets/openSlot.jpg";
import "./Navbar.css";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const { isLoggedIn, logOut } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <NavLink to="/">
          <img
            className="nav-img"
            src={openSlotLogo}
            alt="openSlot logo"
            width={"150px"}
          ></img>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <NavLink to="/features">Features</NavLink>

        <NavLink to="/pricing">Pricing</NavLink>
      </div>

      {/* Buttons */}

      <div className="navbar-buttons">
        {!isLoggedIn && (
          <>
            <button
              onClick={() => navigate("/signup")}
              className="navbar-button"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="navbar-button"
            >
              Login
            </button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button onClick={() => logOut()} className="navbar-button">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
