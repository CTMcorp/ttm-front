import { _get, _post } from "../config/axiosConfig.js";

const UserService = () => {
  const register = (firstname, lastname, email, password, role) => {
    return _post("/auth/register", {
      firstname,
      lastname,
      email,
      password,
      role,
    });
  };

  const login = (email, password) => {
    return _post("/auth/login", { email, password });
  };

  const allTypes = () => {
    return _get("/ttm/allTypes");
  };

  const getUserById = () => {
    return _get("/users/user");
  };

  return { register, login, allTypes, getUserById };


};

export default UserService;
