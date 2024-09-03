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
          axios.get(`${API_URL}/users`), // Updated endpoint for users
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
  }, []);

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
    <div style={{ marginTop: "100px" }}>
      <h2>Create Appointment</h2>
      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading professionals and users...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time:</label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pro">Professional:</label>
            <select
              id="pro"
              value={pro}
              onChange={(e) => setPro(e.target.value)}
              required
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
            <label htmlFor="user">User:</label>
            <select
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            >
              <option value="">Select a user</option>

              {role === "user" ? (
                <option value={userEmail?.id}>{userEmail?.email}</option>
              ) : (
                pros.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.email}
                  </option>
                ))
              )}
            </select>
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Appointment"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Appointment;
