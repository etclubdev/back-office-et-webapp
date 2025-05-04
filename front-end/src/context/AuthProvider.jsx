import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { 
  getAccessToken, 
  setAccessToken, 
  removeAccessToken, 
  getRefreshToken, 
  setRefreshToken, 
  removeRefreshToken 
} from "../utils/jwt";

const isTokenValid = (token) => {
  if (!token) return false;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState({
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken()
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (tokens?.accessToken && isTokenValid(tokens.accessToken)) {
      const decoded = jwtDecode(tokens.accessToken);
      setUser(decoded);
    } else {
      logout(); 
    }
  }, [tokens]);

  const login = ({ accessToken, refreshToken }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setTokens({ accessToken, refreshToken });
  };

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    setTokens(null); 
    setUser(null);   
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
