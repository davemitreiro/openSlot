import "./HomePage.css";
import openSlotLogo from "../assets/openSlot.png";

export default function HomePage() {
  return (
    <div className="main-container">
      <div className="logo">
        <img src={openSlotLogo} alt="logo" />
      </div>
      <h1 className="motto">Your favorite booking platform</h1>
    </div>
  );
}
