import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_API,
});

export default api;
