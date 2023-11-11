import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [userId, setUserId] = useState(null);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const current_time = new Date().getTime() / 1000;
      if (decodedToken.exp < current_time) {
        setIsTokenExpired(true);
      } else {
        setUserId(decodedToken.sub);
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
      setUserId(null);
    }
  };
  useEffect(() => {
    checkAuthentication();
    window.addEventListener("tokenChanged", checkAuthentication);
    return () => {
      window.removeEventListener("tokenChanged", checkAuthentication);
    };
  }, []);

  return {
    isAuthenticated,
    isTokenExpired,
    userId,
    checkAuthentication,
  };
};
