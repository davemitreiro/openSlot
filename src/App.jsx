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

function App() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const id = decodedToken._id;

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/signup"
          element={<SignupPage createUser={SignupPage} />}
        />
        <Route path="/login" element={<LoginPage id={id} />} />
        <Route path={`/dashboard/${id}`} element={<DashboardPage id={id} />} />
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
