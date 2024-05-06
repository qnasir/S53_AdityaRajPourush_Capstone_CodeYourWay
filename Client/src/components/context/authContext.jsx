import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let isTokenAvailable = false;
  
        if (accessToken && refreshToken) {
          isTokenAvailable = true;
        }
  
        if (isTokenAvailable) {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          setIsLoggedIn(true);
          setUsername(response.data.user.username);
          setUserId(response.data.user._id);
        } else {
          setIsLoggedIn(false);
          setUsername("");
          setUserId("");
        }
      } catch (error) {
        console.log(error);
  
        // Handle token Expiration
        if (error.response.status === 401) {
          await refreshAccessToken();
        }
      }
    };
  
    fetchUserData();
  }, [accessToken, refreshToken]);

  const login = (username, userId) => {
    setIsLoggedIn(true);
    setUsername(username);
    setUserId(userId);
  };

  const logout = async () => {
    try {
      // Call the logout route on the backend
      // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
  
      // Clear the user data and tokens from the client-side
      setIsLoggedIn(false);
      setUsername("");
      setUserId("");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken = async() => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/new-access-token`, {refreshToken}, {withCredentials: true});

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      fetchUserData();
    } catch(error){
      console.log(error);

      logout();
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};