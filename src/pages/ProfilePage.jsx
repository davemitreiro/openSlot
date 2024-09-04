import { AuthContext } from "../../context/auth.context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const { user, setUser, role, API_URL } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user?.fullName);
  const [imageUrl, setImageUrl] = useState(user?.img || ""); // State for image preview

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  /* const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePicture) {
        formData.append("img", profilePicture);
      }
      await axios.put(`${API_URL}/${role}/${user?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add your token here
        },
      });*/

  /* const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      //const userId = user?._id;
      const response = await axios.put(`${API_URL}/${role}/${user?.id}`, {
        fullName: name,
        img: profilePicture,
        email,
        password,
      });
      console.log("Profile updated:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };*/

  /*const handleImageUrlInput = (e) => {
    const imageUrl = e.target.value;
    setProfilePicture(imageUrl);
    setImageUrl(imageUrl);
  };*/
  const handleSaveClick = async (e) => {
    e.preventDefault();
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

      await axios.put(`${API_URL}/${role}/${user?.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add your token here
        },
      });
      // Update state to reflect changes
      setIsEditing(false);
      setPassword("");
      if (profilePicture) {
        setImageUrl(URL.createObjectURL(profilePicture)); // Preview updated image
      }
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

  console.log("userid", user.fullName);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {user?.fullname}
      </h1>
      <div className="flex items-center mb-6">
        <img
          src={user?.img || "/default-avatar.png"} // Fallback to a default avatar if user image is missing
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="ml-6">
          <h2 className="text-gray-700 text-lg">
            You have {user?.appointments.length} appointments
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
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-gray-700"
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
