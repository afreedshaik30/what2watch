// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🎬 Watchlist</h1>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/movies">My Movies</Link>
            <Link to="/movies/new">Add Movie</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
