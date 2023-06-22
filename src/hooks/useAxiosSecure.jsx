import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://melody-masters-server.vercel.app",
});

const useAxiosSecure = () => {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("jwt-token");
      if (token) {
        config.headers.authorization = `bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOutUser, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
