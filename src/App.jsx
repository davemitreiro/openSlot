import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css"; //default css to delete

//import pages
import SignupProPage from "./pages/SignupProPage";
import SignupUserPage from "./pages/SignupUserPage";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route
          path="/signup"
          element={<SignupProPage createPro={SignupProPage} />}
        />
        <Route path="/login" element={<DashboardPage />} />

        <Route path="/details" element={<DetailsPage />} />

        <Route path="/notfound" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
