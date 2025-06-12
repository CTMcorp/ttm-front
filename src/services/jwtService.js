import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Erreur de décodage du token :", error);
    return null;
  }
};
