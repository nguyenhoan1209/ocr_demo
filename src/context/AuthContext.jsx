import React, { createContext, useState, useEffect, useContext } from "react";
import FrontImageContext from "./FrontImageContext";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = (props) => {
  
  
  const [token, setToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  useEffect(() => {
    // Function to check token expiration and remove if expired
    const checkTokenExpiration = () => {
      if (token && token.expires_at) {
        const expirationTime = token.expires_at * 1000; // Convert to milliseconds
        const currentTime = new Date().getTime();

        // Check if token has expired
        if (currentTime >= expirationTime) {
          // Token has expired, remove it from local storage
          localStorage.removeItem("authToken");
          // Reset token state
          setToken(null);
        }
      }
    };

    // Check token expiration when component mounts
    checkTokenExpiration();

    // Set up interval to periodically check token expiration
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    // Clean up interval when component unmounts
    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {props.children}
    </AuthContext.Provider>
  );
};
