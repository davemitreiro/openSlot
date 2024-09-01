import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const DetailsPage = () => {
  const { eventId } = useParams(); // Extract eventId from URL params
  const navigate = useNavigate();
  const [event, setEvent] = React.useState(null);

  React.useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://openslot-server.adaptable.app/appointments/${eventId}`
        );
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  // Extract pro and user details if available
  const pro = event.pro?.email || "N/A";
  const user = event.user?.email || "N/A";

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://openslot-server.adaptable.app/appointments/${eventId}`
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event.");
    }
  };

  return (
    <div style={{ marginTop: "200px" }} className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{event.title}</h1>
      <p className="text-lg mb-2">
        Appointment date:{" "}
        {moment(event.startTime).format("MMMM D, YYYY h:mm A")} -{" "}
        {moment(event.endTime).format("h:mm A")}
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Notes:</h2>
        <ul className="list-disc list-inside ml-5">
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
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Business:</h2>
        <p>{pro}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Client:</h2>
        <p>{user}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Created At:</h2>
        <p>{moment(event.createdAt).format("MMMM D, YYYY h:mm A")}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Updated At:</h2>
        <p>{moment(event.updatedAt).format("MMMM D, YYYY h:mm A")}</p>
      </div>
      <button
        onClick={() => navigate(`/update-appointment/${eventId}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Appointment
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Delete Appointment
      </button>
    </div>
  );
};

export default DetailsPage;
