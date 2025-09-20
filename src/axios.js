import axios from "axios";

const API = axios.create({
  baseURL: "/api", 
  withCredentials: true, // عشان الكوكي تتبعت
});

export default API;
