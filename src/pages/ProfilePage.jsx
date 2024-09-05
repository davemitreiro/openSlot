import { AuthContext } from "../../context/auth.context";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const { user, setUser, role, API_URL } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State for image preview
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentCount, setAppointmentCount] = useState(0); // State for appointment count

  const navigate = useNavigate();

  // Utility function to normalize user data (removes _id, adds id)
  const normalizeUser = (user) => {
    if (user._id) {
      const { _id, ...rest } = user;
      return { id: _id, ...rest };
    }
    return user;
  };

  // Effect to normalize user data and set state
  useEffect(() => {
    if (user) {
      console.log("User in context:", user); // Debugging user data
      const normalizedUser = normalizeUser(user);
      setUser(normalizedUser); // Update the user in the context with normalized user object
      setEmail(normalizedUser.email || "");
      setName(normalizedUser.fullName || "");
      setImageUrl(normalizedUser.img || "");
      setAppointmentCount(normalizedUser.appointments?.length || 0); // Update appointment count
    }
  }, [user, setUser]);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    setPassword(""); // Reset the password field
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    // Check if user ID is available before proceeding
    if (!user?.id) {
      console.error("User ID is undefined. Cannot update profile.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("email", email);
      if (password.length > 0) {
        formData.append("password", password);
      }
      if (profilePicture) {
        formData.append("img", profilePicture);
      }

      console.log("User ID before request:", user?.id);

      // Make the PUT request to update user data
      await axios.put(`${API_URL}/${role}/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Immediately make a GET request to fetch updated user data
      const response = await axios.get(`${API_URL}/${role}/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Normalize the user data before updating the context
      const updatedUser = normalizeUser(response.data);
      setUser(updatedUser);

      // Reset the form fields with updated data
      setEmail(updatedUser.email);
      setName(updatedUser.fullName);
      setImageUrl(updatedUser.img);
      setPassword("");
      setIsEditing(false);

      // Update appointment count
      setAppointmentCount(updatedUser.appointments?.length || 0);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl); // Set the image preview URL
    }
  };

  // Check if user.id is available before rendering the form
  if (!user || !user.id) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{user.fullName}</h1>
      <div className="flex items-center mb-6">
        <img
          src={imageUrl || "/default-avatar.png"} // Fallback to a default avatar if user image is missing
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="ml-6">
          <h2 className="text-gray-700 text-lg">
            Glad to have you, {user.fullName}.
          </h2>
          <h2 className="text-gray-700 text-lg">
            You have {appointmentCount} appointment(s).{" "}
            {/* Use appointmentCount */}
          </h2>
        </div>
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Dashboard
      </button>

      {!isEditing ? (
        <button
          onClick={handleEditClick}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Edit
        </button>
      ) : (
        <form onSubmit={handleSaveClick} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg py-2 px-3"
            />
          </div>
          {imageUrl && (
            <div className="mb-4">
              <img
                src={imageUrl}
                alt="Profile Preview"
                className="max-w-xs rounded-lg border border-gray-300"
              />
            </div>
          )}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
