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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ marginTop: "200px" }} className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Update Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
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
          <label className="block mb-2">Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            rows="4"
          />
        </div>
        <button
          type="submit"
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
      </form>
    </div>
  );
}
