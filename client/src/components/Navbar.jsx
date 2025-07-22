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
    <nav className="bg-black/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <h2
          className="text-2xl sm:text-3xl font-bold text-orange-400 hover:text-orange-500 transition-colors cursor-pointer"
          onClick={() => {
            setIsOpen(false);
            navigate("/");
          }}
        >
          What2Watch
        </h2>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white">
          <Link to="/" className="hover:text-orange-400 transition-colors">
            Home
          </Link>
          <Link to="/movie" className="hover:text-orange-400 transition-colors">
            Movies
          </Link>
          <Link to="/tv" className="hover:text-orange-400 transition-colors">
            Shows
          </Link>

          {token ? (
            <>
              <Link
                to="/watchlist"
                className="hover:text-orange-400 transition-colors"
              >
                Watchlist
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-md text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-orange-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-orange-400 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
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

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 text-white px-6 py-7 space-y-2 transition-all text-center">
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
                className="w-[120px] bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
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
