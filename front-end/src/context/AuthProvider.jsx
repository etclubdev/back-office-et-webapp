import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { setAccessToken, removeAccessToken } from "../utils/jwt";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token && token !== undefined) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, [token]);
  
  const login = (token) => {
    setAccessToken(token);
    setToken(token);
  };

  const logout = () => {
    removeAccessToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};