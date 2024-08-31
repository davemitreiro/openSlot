import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointment = () => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [pro, setPro] = useState("");
  const [user, setUser] = useState("");
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch pros and users on component mount
  useEffect(() => {
    const fetchProsAndUsers = async () => {
      try {
        const [proRes, userRes] = await Promise.all([
          axios.get("/pros"), // Endpoint to fetch professionals
          axios.get("/users"), // Endpoint to fetch users
        ]);
        setPros(proRes.data);
        setUsers(userRes.data);
      } catch (err) {
        setError("Failed to fetch pros and users");
        console.error(err);
      }
    };

    fetchProsAndUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointment = { title, startTime, endTime, notes, pro, user };
      const response = await axios.post("/appointments", appointment);
      alert("Appointment created successfully!");
      console.log("Appointment created:", response.data);
      // Clear the form fields after submission
      setTitle("");
      setStartTime("");
      setEndTime("");
      setNotes("");
      setPro("");
      setUser("");
    } catch (err) {
      setError("Failed to create appointment");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      {error && <p className="error">{error}</p>}
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
            {pros.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
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
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default Appointment;
