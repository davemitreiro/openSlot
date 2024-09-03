import { useNavigate } from "react-router-dom";

import notFound from "../../src/assets/404-status-code.png";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="">
      <div>
        <img src={notFound} alt="Not found Page" className="notFoundPic" />
      </div>
      <button onClick={handleNavigate} className="">
        Return to Homepage
      </button>
    </div>
  );
}
