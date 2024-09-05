import "./HomePage.css";
import openSlotLogo from "../assets/openSlot.png";

export default function HomePage() {
  return (
    <div className="main-container">
      <div className="logo">
        <img src={openSlotLogo} alt="logo" />
      </div>
      <h1 className="motto">Your reliable scheduling companion</h1>
    </div>
  );
}
