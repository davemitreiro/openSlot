import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../context/auth.context";
import { CustomDatePicker } from "../components/CustomDatePicker";

export default function UpdateAppointment() {
  const { API_URL } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    startTime: null,
    endTime: null,
    notes: "",
    pro: "",
    user: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/appointments/${eventId}`);
        setFormData({
          title: response.data.title || "",
          startTime: moment(response.data.startTime).toDate(),
          endTime: moment(response.data.endTime).toDate(),
          notes: response.data.notes.join("\n") || "",
          pro: response.data.pro || "",
          user: response.data.user || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to fetch event details.");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [API_URL, eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/appointments/${eventId}`, {
        ...formData,
        startTime: moment(formData.startTime).toISOString(),
        endTime: moment(formData.endTime).toISOString(),
        notes: formData.notes.split("\n"),
      });
      navigate(`/details/${eventId}`); // Redirect after successful update
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/appointments/${eventId}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event.");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-20">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Update Appointment
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="startTime" className="block text-gray-700 mb-2">
            Start Time:
          </label>
          <CustomDatePicker
            selected={formData.startTime}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, startTime: date }))
            }
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-gray-700 mb-2">
            End Time:
          </label>
          <CustomDatePicker
            selected={formData.endTime}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, endTime: date }))
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Appointment
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Delete Appointment
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}
