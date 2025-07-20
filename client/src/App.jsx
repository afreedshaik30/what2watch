import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieList from "./pages/MovieList";
import AddEditMovie from "./pages/AddEditMovie";
import Navbar from "./components/Navbar";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/movies" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/new" element={<AddEditMovie />} />
        <Route path="/movies/edit/:id" element={<AddEditMovie />} />
      </Routes>
    </>
  );
}

export default App;
