import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:3333",
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  const headers = { ...config.headers }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return { ...config, headers }
})

export default api;
