import axios from "axios";

const api = axios.create({
  baseURL: "https://hdteste-teste.azurewebsites.net/",
});

export default api;
