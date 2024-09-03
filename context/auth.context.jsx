import React, { useState, useEffect } from "react";
import axios from "axios";

// Initializing context
const AuthContext = React.createContext();

const API_URL = "http://localhost:5005";

function AuthProviderWrapper(props) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  /* Save the Login's JWT token in our Browser's Storage */
  const saveUserInfo = (response) => {
    localStorage.setItem("authToken", response.data.authToken);
    setRole(response.data.role);
    setUser(response.data.userData);
    console.log(response.data);
  };

  const selectRole = () => {
    setRole(role === "user" ? "pro" : "user");
  };

  const userEmail = user;

  console.log("user", user);

  console.log("userEmail", userEmail?.email);

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
          setRole(response.data.role);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setUser(null);
          setRole(null);
          setIsLoggedIn(false);
        });
    } else {
      setUser(null);
      setRole(null);
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
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        API_URL,
        role,
        userEmail,
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

export { AuthProviderWrapper, AuthContext };
