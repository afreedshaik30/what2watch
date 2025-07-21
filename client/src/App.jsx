import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieList from "./pages/MovieList";
import AddEditMovie from "./pages/AddEditMovie";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./services/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import "./App.css";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/movies" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MovieList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/new"
          element={
            <ProtectedRoute>
              <AddEditMovie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/edit/:id"
          element={
            <ProtectedRoute>
              <AddEditMovie />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
