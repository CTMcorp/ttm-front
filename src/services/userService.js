import { _delete, _get, _post, _put } from "../config/axiosConfig.js";

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

  const getUserAuthenticated = () => {
    return _get("/users/user");
  };

  const getUserById = (id) => {
    let route = "/user";
    if (id) {
      route = "/" + id;
    }
    return _get("/users" + route);
  };

  const updateUser = (id, data) => {
    return _put(`/users/${id}`, { data });
  };

  const deleteUser = (id) => {
    return _delete(`/users/${id}`);
  };

  return {
    register,
    login,
    getUserAuthenticated,
    getUserById,
    updateUser,
    deleteUser,
  };
};

export default UserService;
