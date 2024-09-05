import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { CustomDatePicker } from "./CustomDatePicker";

export default function Component() {
  const { userEmail, role, API_URL } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [notes, setNotes] = useState("");
  const [pro, setPro] = useState("");
  const [user, setUser] = useState("");
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProsAndUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const [proRes, userRes] = await Promise.all([
          axios.get(`${API_URL}/pro`),
          axios.get(`${API_URL}/user`),
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

    if (!title || !startTime || !endTime || !pro || !user) {
      setError("Please fill out all required fields.");
      return;
    }

    if (startTime >= endTime) {
      setError("End time must be after start time.");
      return;
    }

    setSubmitting(true);
    try {
      const appointment = { title, startTime, endTime, notes, pro, user };
      const response = await axios.post(
        `${API_URL}/appointments/create`,
        appointment
      );
      alert("Appointment created successfully!");
      console.log("Appointment created:", response.data);

      setTitle("");
      setStartTime(null);
      setEndTime(null);
      setNotes("");
      setPro("");
      setUser("");

      navigate("/dashboard/");
    } catch (err) {
      setError("Failed to create appointment. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
            <CustomDatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-gray-700 mb-2">
              End Time:
            </label>
            <CustomDatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
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
          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Appointment"}
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
      )}
    </div>
  );
}
