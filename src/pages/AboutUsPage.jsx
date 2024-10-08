import { useNavigate } from "react-router-dom";
export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      {" "}
      {/* Centered container with padding */}
      <h1 className="text-3xl font-bold mb-8 text-center">About Us</h1>{" "}
      {/* Centered heading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {" "}
        {/* Grid layout on medium screens and above */}
        <div className="flex flex-col items-center">
          {" "}
          {/* Team member info */}
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U078HRW0S77-816ad98a1ae5-512"
            alt="Sebastião Profile Pic"
            className="w-32 h-32 rounded-full mb-4 shadow-md" // Set image size and style
          />
          <h2 className="text-xl font-semibold mb-2 text-center">
            Sebastião Cerqueira
          </h2>
          <p className="text-gray-700 text-center">
            {/* Add content or remove if empty */}
          </p>
          <a
            href="https://github.com/smammc"
            className="text-blue-500 hover:underline text-center"
          >
            {/* GitHub link without image */}
            GitHub Profile
          </a>
        </div>
        <div className="flex flex-col items-center">
          {" "}
          {/* Team member info */}
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U078E4D0LNS-3a5d983ff9d6-192"
            alt="David Profile Pic"
            className="w-32 h-32 rounded-full mb-4 shadow-md" // Set image size and style
          />
          <h2 className="text-xl font-semibold mb-2 text-center">
            David Mitreiro
          </h2>
          <p className="text-gray-700 text-center">
            {/* Add content or remove if empty */}
          </p>
          <a
            href="https://github.com/davemitreiro/"
            className="text-blue-500 hover:underline text-center"
          >
            {/* GitHub link without image */}
            GitHub Profile
          </a>
        </div>
        <div className="flex flex-col items-center">
          {" "}
          {/* Team member info */}
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U078ZD3DV0R-47d60a6bafa1-512"
            alt="Dmytro Labenskyy Profile Pic"
            className="w-32 h-32 rounded-full mb-4 shadow-md" // Set image size and style
          />
          <h2 className="text-xl font-semibold mb-2 text-center">
            Dmytro Labenskyy
          </h2>
          <p className="text-gray-700 text-center">
            <a
              href="https://github.com/D-labz"
              className="text-blue-500 hover:underline"
            >
              GitHub Profile
            </a>
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate(`/`)}
          className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
rounded-lg mt-12"
          style={{ backgroundColor: "#68CDFF" }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056B3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#68CDFF")}
        >
          Homepage
        </button>
      </div>
    </div>
  );
}
