import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://backend-wei5.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
