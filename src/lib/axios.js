import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://conferencias-backend.onrender.com/api`,
});