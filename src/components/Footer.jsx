import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <button onClick={() => navigate("/about")} className="footer-button">
        Contact Us
      </button>
      <button
        onClick={() => navigate("/about-project")}
        className="footer-button"
      >
        Project
      </button>
      <a href="https://github.com/davemitreiro/openSlot" target="_blank">
        <button className="footer-button">GitHub page</button>
      </a>
    </footer>
  );
}
