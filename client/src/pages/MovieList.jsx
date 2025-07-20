import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getMovies();

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
  }, [token, navigate]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading movies...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2>My Watchlist</h2>
        <button
          onClick={() => navigate("/movies/new")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Movie
        </button>
      </div>

      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#ffebee",
            borderRadius: "4px",
          }}
        >
          {error}
          <button
            onClick={loadMovies}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {movies.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
          }}
        >
          <h3>No movies in your watchlist</h3>
          <p>Add your first movie to get started!</p>
          <button
            onClick={() => navigate("/movies/new")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Your First Movie
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                    {movie.name}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 15px 0",
                      color: "#666",
                      lineHeight: "1.5",
                    }}
                  >
                    {movie.description}
                  </p>
                  {movie.link && (
                    <a
                      href={movie.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      🎬 Watch Movie
                    </a>
                  )}
                </div>

                <div
                  style={{ display: "flex", gap: "10px", marginLeft: "20px" }}
                >
                  <button
                    onClick={() => navigate(`/movies/edit/${movie.id}`)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
