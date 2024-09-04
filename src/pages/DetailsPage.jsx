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
  /*
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

      <button
        onClick={() => navigate(`/dashboard`)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Return to Dashboard
      </button>
    </div>
  );
};*/

  return (
    <div
      style={{ marginTop: "200px" }}
      className="container mx-auto mt-16 pb-16"
    >
      {" "}
      {/* Centered container with top and bottom margins */}
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>{" "}
      {/* Heading with styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {" "}
        {/* Two-column grid layout on medium screens and above */}
        <div>
          {" "}
          {/* Left column */}
          <p className="text-lg mb-2">
            Appointment date:{" "}
            {moment(event.startTime).format("MMMM D, YYYY h:mm A")} -{" "}
            {moment(event.endTime).format("h:mm A")}
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Notes:</h2>
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
            <h2 className="text-xl font-semibold mb-2">Created At:</h2>
            <p>{moment(event.createdAt).format("MMMM D, YYYY h:mm A")}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Updated At:</h2>
            <p>{moment(event.updatedAt).format("MMMM D, YYYY h:mm A")}</p>
          </div>
        </div>
        <div>
          {" "}
          {/* Right column */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Business:</h2>
            <p>{pro}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Client:</h2>
            <p>{user}</p>
          </div>
          <div className="flex justify-center">
            {" "}
            {/* Center buttons */}
            <button
              onClick={() => navigate(`/update-appointment/${eventId}`)}
              className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   
rounded-lg mr-2"
            >
              Update Appointment
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-4 text-sm font-medium text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300   
rounded-lg"
            >
              Delete Appointment
            </button>
          </div>
          <button
            onClick={() => navigate(`/dashboard`)}
            className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   
rounded-lg mt-4"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
