import axios from "axios";

console.log(import.meta.env.VITE_REACT_API)

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export default api;
