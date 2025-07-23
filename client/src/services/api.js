import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
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

// Movie API calls with FormData support
export const addMovie = (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  if (data.link) formData.append("link", data.link);
  if (data.genre) formData.append("genre", data.genre);
  if (data.poster) formData.append("poster", data.poster);
  return API.post("/movies", formData);
};

export const updateMovie = (id, data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  if (data.link) formData.append("link", data.link);
  if (data.genre) formData.append("genre", data.genre);
  if (data.poster) formData.append("poster", data.poster);
  return API.put(`/movies/${id}`, formData);
};

// Get with filters: /movies?name=...&genre=...
export const getMovies = (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  return API.get(`/movies${query ? `?${query}` : ""}`);
};

export const getMovie = (id) => API.get(`/movies/${id}`);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

// Utility function to extract token from the string response
export const extractTokenFromResponse = (tokenString) => {
  const match = tokenString.match(/token=([^)]+)/);
  return match ? match[1] : null;
};

// Logout utility
export const logout = () => {
  localStorage.removeItem("token");
};
