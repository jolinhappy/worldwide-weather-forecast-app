import axios from "axios";

const baseURL = "https://api.openweathermap.org/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response)=> {
    return response.data;
  },
  (error) => Promise.reject(error)
)

export const apiHelper = axiosInstance;