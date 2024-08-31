import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import AboutUsPage from "./pages/AboutUsPage";

//impor components
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";

//import pages
import SignupProPage from "./pages/SignupProPage";
import SignupUserPage from "./pages/SignupUserPage";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUs from "./pages/AboutUsPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/signup-pro"
          element={<SignupProPage createPro={SignupProPage} />}
        />
        <Route
          path="/signup-user"
          element={<SignupUserPage createUser={SignupUserPage} />}
        />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/notfound" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
