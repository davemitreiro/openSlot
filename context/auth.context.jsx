import React, { useState, useEffect } from "react";
import axios from "axios";

// Initializing context
const AuthContext = React.createContext();

const API_URL = "https://openslot-server.adaptable.app";

function AuthProviderWrapper(props) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Save the Login's JWT token in our Browser's Storage */
  const saveUserInfo = (response) => {
    localStorage.setItem("authToken", response.data.authToken);
    setUser(response.data);
    console.log(response.data);
  };

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
          setUser(response.data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setUser(null);
          setIsLoggedIn(false);
        });
    } else {
      setUser(null);
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
      value={{ isLoggedIn, user, saveUserInfo, authenticateUser, logOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
