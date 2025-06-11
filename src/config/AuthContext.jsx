import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserFromToken } from "../services/jwtService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  // const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const userData = getUserFromToken(token);
    if (userData) {
      setUser(userData);
      // setIsLogged(true);
    }
  }, []);

  const login = (token) => {
    const userData = getUserFromToken(token);
    sessionStorage.setItem("accessToken", token);
    setUser(userData);
  };

  // const loginContext = () => {
  //   setIsLogged(true);
  // };
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    // setIsLogged(false);
    navigate("auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ /*isLogged, */ user, login, /* loginContext,*/ logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
