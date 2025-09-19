import axios from "axios";

const API = axios.create({
  baseURL: "https://alemam-b.vercel.app/api",
  withCredentials: true, 
});

export default API;
