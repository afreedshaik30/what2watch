import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <h2
          className="text-3xl font-extrabold text-orange-400 hover:text-orange-500 cursor-pointer transition"
          onClick={() => {
            setIsOpen(false);
            navigate("/");
          }}
        >
          What2Watch
        </h2>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-white text-sm font-medium">
          <Link to="/" className="hover:text-orange-400">
            Home
          </Link>
          <Link to="/movie" className="hover:text-orange-400">
            Movies
          </Link>
          <Link to="/tv" className="hover:text-orange-400">
            Shows
          </Link>

          {token ? (
            <>
              <Link to="/watchlist" className="hover:text-orange-400">
                Watchlist
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-orange-400">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/90 text-white px-4 py-3 space-y-2 transition-all">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-orange-400"
          >
            Home
          </Link>
          <Link
            to="/movie"
            onClick={() => setIsOpen(false)}
            className="block hover:text-orange-400"
          >
            Movies
          </Link>
          <Link
            to="/tv"
            onClick={() => setIsOpen(false)}
            className="block hover:text-orange-400"
          >
            Shows
          </Link>

          {token ? (
            <>
              <Link
                to="/watchlist"
                onClick={() => setIsOpen(false)}
                className="block hover:text-orange-400"
              >
                Watchlist
              </Link>
              <button
                onClick={handleLogout}
                className="w-[140px] bg-red-600 hover:bg-red-700 text-white py-2 mt-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block hover:text-orange-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block hover:text-orange-400"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
