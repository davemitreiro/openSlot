import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const DetailsPage = () => {
  const { eventId } = useParams(); // Extract eventId from URL params
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const { API_URL } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/appointments/${eventId}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to fetch event details.");
      }
    };

    fetchEvent();
  }, [eventId, API_URL]);

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!event) return <div className="text-center mt-6">Loading...</div>;

  // Extract pro and user details if available
  const pro = event.pro?.email || "N/A";
  const user = event.user?.email || "N/A";

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/appointments/${eventId}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{event.title}</h1>

      <p className="text-lg mb-4">
        <span className="font-semibold">Appointment date:</span>{" "}
        {moment(event.startTime).format("MMMM D, YYYY h:mm A")} -{" "}
        {moment(event.endTime).format("h:mm A")}
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Notes:</h2>
        <ul className="list-disc list-inside ml-5 text-gray-600">
          {event.notes && event.notes.length > 0 ? (
            event.notes.map((note, index) => (
              <li key={index} className="mb-2">
                {note}
              </li>
            ))
          ) : (
            <li>No notes available</li>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Business:</h2>
        <p className="text-gray-600">{pro}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Client:</h2>
        <p className="text-gray-600">{user}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Created At:
        </h2>
        <p className="text-gray-600">
          {moment(event.createdAt).format("MMMM D, YYYY h:mm A")}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Updated At:
        </h2>
        <p className="text-gray-600">
          {moment(event.updatedAt).format("MMMM D, YYYY h:mm A")}
        </p>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => navigate(`/update-appointment/${eventId}`)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update Appointment
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Delete Appointment
        </button>
        <button
          onClick={() => navigate(`/dashboard`)}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
