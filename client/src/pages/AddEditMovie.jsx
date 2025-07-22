import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, getMovie, updateMovie } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AddEditMovie() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    link: "",
    genre: "",
    poster: null,
  });
  const [posterName, setPosterName] = useState(""); // ✅ File name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const isEdit = Boolean(id);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    if (isEdit) {
      loadMovie();
    }
  }, [id, isEdit, navigate, token]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getMovie(id);
      if (res.data.success && res.data.data) {
        const { name, description, link, genre } = res.data.data;
        setForm({
          name,
          description,
          link: link || "",
          genre: genre || "",
          poster: null,
        });
      } else {
        setError("Movie not found");
        setTimeout(() => navigate("/watchlist"), 2000);
      }
    } catch (err) {
      console.error("Load movie error:", err);
      if (err.response?.status === 404) {
        setError("Movie not found");
        setTimeout(() => navigate("/watchlist"), 2000);
      } else {
        setError("Failed to load movie details");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, poster: file });
      setPosterName(file.name); // ✅ Store file name
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = isEdit ? await updateMovie(id, form) : await addMovie(form);
      if (res.data.success) {
        navigate("/watchlist");
      } else {
        setError(
          res.data.message || `Failed to ${isEdit ? "update" : "add"} movie`
        );
      }
    } catch (err) {
      console.error(`${isEdit ? "Update" : "Add"} movie error:`, err);
      setError(
        err.response?.data?.message ||
          `Failed to ${isEdit ? "update" : "add"} movie. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/watchlist");
  };

  if (loading && isEdit) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading movie details...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <div className="relative mb-8 text-center">
        <button
          type="button"
          onClick={handleCancel}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          Back
        </button>
        <h2 className="text-3xl font-bold text-gray-800">
          {isEdit ? "Edit Movie" : "Add New Movie"}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-5 p-3 text-red-700 bg-red-100 rounded-md border border-red-300">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">
            Movie Name *
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter movie name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">
            Description *
          </label>
          <textarea
            name="description"
            placeholder="Enter movie description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">
            Movie Link
          </label>
          <input
            name="link"
            type="url"
            placeholder="Enter movie URL (optional)"
            value={form.link}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">Genre</label>
          <input
            name="genre"
            type="text"
            placeholder="Genre (optional)"
            value={form.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Upload Poster
          </label>
          <input
            name="poster"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {posterName && (
            <p className="mt-2 text-sm font-medium text-gray-500 truncate break-all max-w-full">
              Selected file: {posterName}
            </p>
          )}

          <small className="text-sm text-gray-500">
            Optional: Upload movie poster
          </small>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 px-4 py-3 font-bold text-white rounded-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update Movie"
              : "Add Movie"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className={`flex-1 px-4 py-3 font-medium text-white rounded-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
