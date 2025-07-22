import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";
import AddEditMovie from "./pages/AddEditMovie";
import DetailPage from "./pages/DetailPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {/* 1.Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tv" element={<Shows />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:type/:id" element={<DetailPage />} />
        {/* 2.Protected Routes */}
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist/new"
          element={
            <ProtectedRoute>
              <AddEditMovie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist/edit/:id"
          element={
            <ProtectedRoute>
              <AddEditMovie />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
