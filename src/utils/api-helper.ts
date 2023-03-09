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
  (error) => {
    if (error.response) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
)

export const apiHelper = axiosInstance;