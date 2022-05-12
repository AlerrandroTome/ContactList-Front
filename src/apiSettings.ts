import axios from "axios";
import { authHeader } from "./Services/authHeader";

export const api = axios.create({
  baseURL: "https://localhost:7297/api",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const access_token = JSON.parse(
      localStorage.getItem("user") as string
    ).token;
    if (error.response.status === 401 && access_token) {
      window.localStorage.href = "/login";
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    if (config !== undefined && config.headers !== undefined) {
      const token = authHeader();
      const isLoginRequest = config.url?.includes("login");
      if (token && !isLoginRequest) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
