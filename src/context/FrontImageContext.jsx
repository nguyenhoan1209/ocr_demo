import React, { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const FrontImageContext = createContext();

export default FrontImageContext;

export const FrontImageProvider = (props) => {
  const [token, setToken] = useContext(AuthContext);
  const [frontImg, setFrontImg] = useState(() =>
    localStorage.getItem("frontImg") ? localStorage.getItem("frontImg") : null
  );

  useEffect(() => {
    // Function to check token expiration and remove if expired
    const checkTokenExpiration = () => {
      if (token && token.expires_at) {
        const expirationTime = token.expires_at * 1000; // Convert to milliseconds
        const currentTime = new Date().getTime();

        // Check if token has expired
        if (currentTime >= expirationTime) {
          localStorage.removeItem("frontImg");
          setFrontImg(null)
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
    <FrontImageContext.Provider value={[frontImg, setFrontImg]}>
      {props.children}
    </FrontImageContext.Provider>
  );
};
