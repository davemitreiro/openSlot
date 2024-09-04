import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Import the App component
import "./index.css"; // Import your global styles
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import { AuthProviderWrapper } from "../context/auth.context"; // Import your context provider
//import { RoleProviderWrapper } from "../context/role.context"; // Import your context provider

// Get the root element from the DOM
const rootElement = document.getElementById("root");

// Create a root and render the application
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </StrictMode>
);
