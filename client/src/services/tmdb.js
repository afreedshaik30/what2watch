// // tmdb.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Axios instance
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Generic API call
const apiCall = async (endpoint, params = {}) => {
  try {
    const response = await tmdbApi.get(endpoint, { params });
    return { data: response.data, error: null };
  } catch (error) {
    console.error("API Error:", error);
    return {
      data: null,
      error: error.response?.data?.status_message || "Failed to fetch data",
    };
  }
};

// Shared APIs
export const fetchGenres = (mediaType = "movie") =>
  apiCall(`/genre/${mediaType}/list`);

export const fetchLanguages = async () => {
  const { data } = await apiCall("/configuration/languages");
  if (!data) return [];
  return data.filter((lang) =>
    ["English", "Hindi", "Telugu"].includes(lang.english_name)
  );
};

export const fetchPopular = (mediaType = "movie") =>
  apiCall(`/${mediaType}/popular`);

export const fetchByGenre = (mediaType, genreId) =>
  apiCall(`/discover/${mediaType}`, { with_genres: genreId });

export const fetchByLanguage = (mediaType, langCode) =>
  apiCall(`/discover/${mediaType}`, { with_original_language: langCode });

export const searchMedia = (mediaType, query) =>
  apiCall(`/search/${mediaType}`, { query });

export const fetchMediaDetails = (mediaType, id) =>
  apiCall(`/${mediaType}/${id}`);

export const fetchCredits = (mediaType, id) =>
  apiCall(`/${mediaType}/${id}/credits`);

export const fetchVideos = (mediaType, id) =>
  apiCall(`/${mediaType}/${id}/videos`);

export const fetchTrending = (mediaType = "movie") =>
  apiCall(`/trending/${mediaType}/week`);
