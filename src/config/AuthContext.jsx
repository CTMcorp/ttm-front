import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserFromToken } from "../services/jwtService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const userData = getUserFromToken(token);
    if (userData) {
      setUser(userData);
    }
  }, []);

  const login = (token) => {
    const userData = getUserFromToken(token);
    sessionStorage.setItem("accessToken", token);
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
