import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";

// Import pages
import LoginPage from "./pages/LoginPage";
import SignupProPage from "./pages/SignupProPage";
import SignupUserPage from "./pages/SignupUserPage";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from "./pages/AboutUsPage";
import UpdateAppointmentPage from "./pages/UpdateAppointmentPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup-pro" element={<SignupProPage />} />
        <Route path="/signup-user" element={<SignupUserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/details/:eventId" element={<DetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/update-appointment/:eventId"
          element={<UpdateAppointmentPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
