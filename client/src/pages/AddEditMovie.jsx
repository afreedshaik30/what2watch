import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, getMovies, updateMovie } from "../services/api";

export default function AddEditMovie() {
  const [form, setForm] = useState({ name: "", description: "", link: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getMovies().then((res) => {
        const movie = res.data.data.find((m) => m.id === parseInt(id));
        if (movie) setForm(movie);
      });
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) await updateMovie(id, form);
    else await addMovie(form);
    navigate("/movies");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit Movie" : "Add Movie"}</h2>
      <input
        name="name"
        placeholder="Movie Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="link"
        placeholder="Link"
        value={form.link}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}
