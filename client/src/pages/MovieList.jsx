import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const loadMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data.data);
    } catch (err) {
      alert("Failed to load movies");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      await deleteMovie(id);
      loadMovies();
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <h2>My Watchlist</h2>
      <button onClick={() => navigate("/movies/new")}>Add Movie</button>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.name}</strong> - {movie.description}
            <div>
              <a href={movie.link} target="_blank">
                Watch
              </a>
              <button onClick={() => navigate(`/movies/edit/${movie.id}`)}>
                Edit
              </button>
              <button onClick={() => handleDelete(movie.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
