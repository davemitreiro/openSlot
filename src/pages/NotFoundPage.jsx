import { useNavigate } from "react-router-dom";

import "./NotFoundPage.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="">
      <div>
        <img src={notFoundPic} alt="Not found Page" className="notFoundPic" />
      </div>
      <button onClick={handleNavigate} className="">
        Return to Homepage
      </button>
    </div>
  );
}
