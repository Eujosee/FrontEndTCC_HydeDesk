import axios from "axios";

const api = axios.create({
  baseURL: "https://hdteste.azurewebsites.net/",
});

export default api;
