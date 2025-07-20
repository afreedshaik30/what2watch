// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Request interceptor to add token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor to handle authentication errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

// Movie API calls
export const getMovies = () => API.get("/movies");
export const getMovie = (id) => API.get(`/movies/${id}`);
export const addMovie = (data) => API.post("/movies", data);
export const updateMovie = (id, data) => API.put(`/movies/${id}`, data);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

// Utility function to extract token from the string response
export const extractTokenFromResponse = (tokenString) => {
  // Extract token from "AuthResponse(token=actual_token_here)"
  const match = tokenString.match(/token=([^)]+)/);
  return match ? match[1] : null;
};

// Logout utility
export const logout = () => {
  localStorage.removeItem("token");
};
