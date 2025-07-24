import axios from "axios";
import { VITE_API_URL } from "../config/env";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");
    config.headers.Authorization = `Bearear ${token}`;

    // console.log(token);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// If you need to remove an interceptor later you can.
// axios.interceptors.request.eject(myInterceptor);
