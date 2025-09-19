import axios from "axios";

const API = axios.create({
  baseURL: "https://alemam-ied7oy9ta-kareems-projects-cc09171a.vercel.app/api",
  withCredentials: true, 
});

export default API;
