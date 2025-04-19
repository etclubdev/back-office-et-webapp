import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../api/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };
    fetchUser();
  }, []); 

  const login = async () => {
    //login api
    //setUser(user)
  };

  const logout = () => {
    //logout api
    //setUser(null)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
