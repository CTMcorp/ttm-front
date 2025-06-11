import { _get } from "../config/axiosConfig";

const profileService = () => {
  // Méthode à renvoyer dans les cas où l'utilisateur connecté est un admin
  const getAllUsers = () => {
    return _get("/users/profiles");
  };

  //   Méthode à renvoyer dans le cas où l'utilisateur connecté est un porteur
  const getAllParrains = () => {
    return _get("/users/parrainsProfiles");
  };

  return { getAllUsers, getAllParrains };
};

export default profileService;
