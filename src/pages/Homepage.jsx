import "./HomePage.css";
import openSlotLogo from "../assets/openSlot.png";
import yourGif from "../assets/myGif.gif"; // Import your GIF

export default function HomePage() {
  return (
    <div className="main-container">
      <div className="logo">
        <img src={openSlotLogo} alt="logo" />
      </div>
      <h1 className="motto animate-text">Your reliable scheduling companion</h1>
      <div className="video-container">
        <img src={yourGif} alt="GIF description" />
      </div>
    </div>
  );
}