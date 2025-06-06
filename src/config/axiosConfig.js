import axios from "axios";

const client = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    let token;
    if (token && config.url !== "/auth/register") {
      token = sessionStorage.getItem("accessToken");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default client;

const _get = async (url, config = {}) => {
  return await client.get(url, config);
};

const _delete = async (url, config = {}) => {
  return await client.delete(url, config);
};

const _post = async (url, data = {}, config = {}) => {
  return await client.post(url, data, config);
};

const _put = async (url, data = {}, config = {}) => {
  return await client.put(url, data, config);
};

export { _get, _delete, _post, _put };
