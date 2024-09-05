import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { AuthContext } from "../../context/auth.context";

const Appointment = () => {
  // State for form fields
  const { userEmail, role, API_URL } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [pro, setPro] = useState("");
  const [user, setUser] = useState("");
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch pros and users on component mount
  useEffect(() => {
    const fetchProsAndUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const [proRes, userRes] = await Promise.all([
          axios.get(`${API_URL}/pro`), // Updated endpoint for pros
          axios.get(`${API_URL}/user`), // Updated endpoint for users
        ]);

        setPros(proRes.data);
        setUsers(userRes.data);
      } catch (err) {
        setError("Failed to fetch pros and users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProsAndUsers();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!title || !startTime || !endTime || !pro || !user) {
      setError("Please fill out all required fields.");
      return;
    }

    // Ensure end time is after start time
    if (new Date(startTime) >= new Date(endTime)) {
      setError("End time must be after start time.");
      return;
    }

    setSubmitting(true);
    try {
      const appointment = { title, startTime, endTime, notes, pro, user };
      const response = await axios.post(
        `${API_URL}/appointments/create`,
        appointment
      ); // Updated endpoint for creating an appointment
      alert("Appointment created successfully!");
      console.log("Appointment created:", response.data);

      // Clear the form fields after submission
      setTitle("");
      setStartTime("");
      setEndTime("");
      setNotes("");
      setPro("");
      setUser("");

      // Navigate back to the dashboard after successful submission
      navigate("/dashboard/"); // Replace '/dashboard' with the correct route if necessary
    } catch (err) {
      setError("Failed to create appointment. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "200px",
        paddingBottom: "80px",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* The marginTop and paddingBottom ensure the content is not covered by the navbar or footer */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Create Appointment
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <p className="text-center">Loading professionals and users...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-gray-700 mb-2">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-gray-700 mb-2">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-gray-700 mb-2">
              Notes:
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="pro" className="block text-gray-700 mb-2">
              Professional:
            </label>
            <select
              id="pro"
              value={pro}
              onChange={(e) => setPro(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a professional</option>

              {role === "pro" ? (
                <option value={userEmail?.id}>{userEmail?.email}</option>
              ) : (
                pros.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.email}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <label htmlFor="user" className="block text-gray-700 mb-2">
              User:
            </label>
            <select
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a user</option>

              {role === "user" ? (
                <option value={userEmail?.id}>{userEmail?.email}</option>
              ) : (
                users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.email}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              {submitting ? "Creating..." : "Create Appointment"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
            >
              Dashboard
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Appointment;
