import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css"; //default css to delete

//import pages
import SignupProPage from "./pages/SignupProPage";
import SignupUserPage from "./pages/SignupUserPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={<SignupProPage createPro={SignupPage} />}
        />
        <Route path="/login" login={LoginPage} />
      </Routes>
    </>
  );
}

export default App;
