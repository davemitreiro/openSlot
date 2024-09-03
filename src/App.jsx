import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import { jwtDecode } from "jwt-decode";

// Import pages
import LoginPage from "./pages/LoginPage";

import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from "./pages/AboutUsPage";
import UpdateAppointmentPage from "./pages/UpdateAppointmentPage";
import { RoleContext } from "../context/role.context";
import { AuthContext, ProtectedRoute } from "../context/auth.context";
import Appointment from "./components/Appointment";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/signup"
          element={<SignupPage createUser={SignupPage} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/details/:eventId" element={<DetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<Appointment />} />
          <Route
            path="/update-appointment/:eventId"
            element={<UpdateAppointmentPage />}
          />
        </Route>
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
