import axios from "axios";

const api = axios.create({
  baseURL: "https://hydedesk-api.azurewebsites.net/",
});

export default api;
