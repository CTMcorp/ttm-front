import { createContext, useState } from "react";
import { useNavigate } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const loginContext = () => {
    setIsLogged(true);
  };
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLogged(false);
    navigate("auth/login");
  };

  return (
    <AuthContext.Provider value={{ isLogged, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
