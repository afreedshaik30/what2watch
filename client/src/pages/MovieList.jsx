import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MovieList() {
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
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ fontSize: "28px", fontWeight: "600", color: "#333" }}>
          🎬 My Watchlist
        </h2>
        <button
          onClick={() => navigate("/movies/new")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ➕ Add Movie
        </button>
      </div>

      {/* 🔍 Search / Filter UI */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "25px",
          background: "#f1f1f1",
          padding: "20px",
          borderRadius: "8px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Search by name..."
          value={filters.name}
          onChange={handleFilterChange}
          style={{
            flexGrow: 1,
            flexBasis: "calc(45%)",
            minWidth: "250px",
            padding: "14px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <input
          type="text"
          name="genre"
          placeholder="Filter by genre..."
          value={filters.genre}
          onChange={handleFilterChange}
          style={{
            flexGrow: 1,
            flexBasis: "calc(45%)",
            minWidth: "250px",
            padding: "14px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "14px 30px",
            backgroundColor: "#28a745",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          🔍 Search
        </button>
      </form>

      {/* ❌ Error */}
      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          {error}
          <button
            onClick={loadMovies}
            style={{
              marginLeft: "15px",
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "5px 10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* ⏳ Loading */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Loading movies...</h2>
        </div>
      ) : movies.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
          }}
        >
          <h3>No movies found</h3>
          <p>Try different filters or add a new movie!</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={`${movie.name} Poster`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderBottom: "1px solid #eee",
                  }}
                />
              )}

              <div style={{ padding: "16px", flex: 1 }}>
                <h3 style={{ margin: "0 0 10px", color: "#333" }}>
                  {movie.name}
                </h3>
                <p style={{ color: "#666", marginBottom: "10px" }}>
                  {movie.description}
                </p>
                {movie.genre && (
                  <p style={{ fontSize: "14px", color: "#888" }}>
                    🎭 Genre: {movie.genre}
                  </p>
                )}
                {movie.link && (
                  <a
                    href={movie.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      color: "#007bff",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    ▶ Watch Trailer
                  </a>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px",
                  borderTop: "1px solid #eee",
                  backgroundColor: "#fafafa",
                }}
              >
                <button
                  onClick={() => navigate(`/movies/edit/${movie.id}`)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#ffc107",
                    color: "black",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
