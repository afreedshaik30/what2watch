import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Film,
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  PlayCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ name: "", genre: "" });
  const navigate = useNavigate();
  const { token } = useAuth();

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError("");
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v.trim() !== "")
      );
      const res = await getMovies(cleanFilters);
      if (res.data.success) {
        setMovies(res.data.data || []);
      } else {
        setError(res.data.message || "Failed to load movies");
      }
    } catch (err) {
      console.error("Load movies error:", err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const res = await deleteMovie(id);
        if (res.data.success) {
          setMovies(movies.filter((movie) => movie.id !== id));
        } else {
          alert(res.data.message || "Failed to delete movie");
        }
      } catch (err) {
        console.error("Delete movie error:", err);
        alert("Failed to delete movie. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    loadMovies();
  }, [token]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadMovies();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h2 className="flex items-center gap-2 text-3xl font-light text-white tracking-tight">
          <Film className="w-8 h-8" />
          My Watchlist
        </h2>

        <button
          onClick={() => navigate("/watchlist/new")}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition"
        >
          <PlusCircle className="w-5 h-5" /> Add Movie
        </button>
      </div>

      {/* Filter form */}
      <form
        onSubmit={handleSearch}
        className="shadow-md rounded-xl px-6 py-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10"
      >
        <input
          type="text"
          name="name"
          placeholder="Search by name..."
          value={filters.name}
          onChange={handleFilterChange}
          className="flex-1 p-3 border border-orange-400 rounded-lg focus:outline-none focus:ring-3 focus:ring-orange-500 text-sm"
        />
        <input
          type="text"
          name="genre"
          placeholder="Filter by genre..."
          value={filters.genre}
          onChange={handleFilterChange}
          className="flex-1 p-3 border border-orange-400 rounded-lg focus:outline-none focus:ring-3 focus:ring-orange-500 text-sm"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </form>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <button
            onClick={loadMovies}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-gray-600" />
          <p className="mt-4 text-gray-500">Loading movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No movies found
          </h3>
          <p className="text-sm text-gray-500">
            Try different filters or add a new movie!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="backdrop-blur bg-white/80 border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col transition hover:shadow-xl"
            >
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={`${movie.name} Poster`}
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {movie.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {movie.description}
                  </p>
                  {movie.genre && (
                    <p className="text-xs text-gray-500 mt-2">
                      🎭 Genre: {movie.genre}
                    </p>
                  )}
                  {movie.link && (
                    <a
                      href={movie.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-3"
                    >
                      <PlayCircle className="w-4 h-4" /> Watch Trailer
                    </a>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center px-5 py-3 border-t bg-gray-50">
                <button
                  onClick={() => navigate(`/watchlist/edit/${movie.id}`)}
                  className="inline-flex items-center gap-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-3 py-1.5 rounded-md"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="inline-flex items-center gap-1 text-sm bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 rounded-md"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
