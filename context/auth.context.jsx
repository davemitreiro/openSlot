import React, { useState, useEffect, useContext } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

// Initializing context
const AuthContext = React.createContext();

const API_URL =
  "https://open-slot-davids-projects-5a814204.vercel.app/" ||
  "http://localhost:5005";

function AuthProviderWrapper(props) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("pro");

  const navigate = useNavigate();

  /* Save the Login's JWT token in our Browser's Storage */
  const saveUserInfo = (response) => {
    localStorage.setItem("authToken", response.data.authToken);
    setRole(response.data.role);
    setUser(response.data.userData);
    setIsLoggedIn(true);
    console.log("this", response);
  };

  const selectRole = () => {
    setRole(role === "user" ? "pro" : "user");
  };

  const userEmail = user;

  // console.log("user", user);
  //console.log("userEmail", userEmail?.email);

  /* Function that authenticates the user ---> verifies if the token is valid */
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response.data.userData);
          console.log(role);
          console.log("response", response.data.role);
          setRole(response.data.role);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setUser(null);
          setRole("pro");
          setIsLoggedIn(false);
        });
    } else {
      setUser(null);
      setRole("pro");
      setIsLoggedIn(false);
    }
  };

  // Keeps the user logged in after reloading the page
  useEffect(() => {
    authenticateUser();
  }, []);

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOut = () => {
    removeToken();
    authenticateUser();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        API_URL,
        role,
        userEmail,
        setUser,
        selectRole,
        saveUserInfo,
        authenticateUser,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// A ProtectedRoute component that checks if the user is authenticated
function ProtectedRoute({ redirectPath = "/login", children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
}

export { AuthProviderWrapper, AuthContext, ProtectedRoute };
