import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="Footer">
      <button onClick={() => navigate("/about")} className="navbar-button">
        Contact Us
      </button>
      {/*<a
        className=""
        href=""
        img={""}
        src={}
        alt="text-logo"
      >GitHub</a>*/}
    </footer>
  );
}
