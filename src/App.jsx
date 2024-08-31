import { Routes, Route } from "react-router-dom";

// Import axios if needed
import axios from "axios";

// Import components and pages
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Calendar from "./components/Calendar";

// Pages
import SignupProPage from "./pages/SignupProPage";
import SignupUserPage from "./pages/SignupUserPage";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from "./pages/AboutUsPage";
import Appointment from "./components/Appointment";

function App() {
  // Create user handler (e.g., save user data after sign up)
  const handleCreateUser = (userData) => {
    console.log("User created:", userData);
    // You can add logic here to save the user data to state, context, or make additional API calls
  };

  // Create pro handler (e.g., save pro user data after sign up)
  const handleCreatePro = (proData) => {
    console.log("Pro created:", proData);
    // You can add logic here to save the pro user data to state, context, or make additional API calls
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/signup-pro"
          element={<SignupProPage createPro={handleCreatePro} />}
        />
        <Route
          path="/signup-user"
          element={<SignupUserPage createUser={handleCreateUser} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
