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
        setTimeout(() => navigate("/movies"), 2000);
      }
    } catch (err) {
      console.error("Load movie error:", err);
      if (err.response?.status === 404) {
        setError("Movie not found");
        setTimeout(() => navigate("/movies"), 2000);
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
    setForm({ ...form, poster: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = isEdit ? await updateMovie(id, form) : await addMovie(form);

      if (res.data.success) {
        navigate("/movies");
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
    navigate("/movies");
  };

  if (loading && isEdit) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading movie details...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <div
        style={{
          position: "relative",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <button
          type="button"
          onClick={handleCancel}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
        <h2 style={{ margin: 0 }}>{isEdit ? "Edit Movie" : "Add New Movie"}</h2>
      </div>

      <form onSubmit={handleSubmit}>
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
          </div>
        )}

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Movie Name *</label>
          <input
            name="name"
            type="text"
            placeholder="Enter movie name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Description *</label>
          <textarea
            name="description"
            placeholder="Enter movie description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Movie Link</label>
          <input
            name="link"
            type="url"
            placeholder="Enter movie URL (optional)"
            value={form.link}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Genre</label>
          <input
            name="genre"
            type="text"
            placeholder="Genre (optional)"
            value={form.genre}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label style={labelStyle}>Upload Poster</label>
          <input
            name="poster"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ ...inputStyle, padding: "8px" }}
          />
          <small style={{ color: "#666", fontSize: "12px" }}>
            Optional: Upload movie poster
          </small>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
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
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#333",
};

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { addMovie, getMovie, updateMovie } from "../services/api";
// import { useAuth } from "../context/AuthContext";

// export default function AddEditMovie() {
//   const [form, setForm] = useState({ name: "", description: "", link: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token } = useAuth();

//   const isEdit = Boolean(id);

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//       return;
//     }
//     if (isEdit) {
//       loadMovie();
//     }
//   }, [id, isEdit, navigate, token]);

//   const loadMovie = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await getMovie(id);
//       if (res.data.success && res.data.data) {
//         setForm(res.data.data);
//       } else {
//         setError("Movie not found");
//         setTimeout(() => navigate("/movies"), 2000);
//       }
//     } catch (err) {
//       console.error("Load movie error:", err);
//       if (err.response?.status === 404) {
//         setError("Movie not found");
//         setTimeout(() => navigate("/movies"), 2000);
//       } else {
//         setError("Failed to load movie details");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       let res;
//       if (isEdit) {
//         res = await updateMovie(id, form);
//       } else {
//         res = await addMovie(form);
//       }

//       if (res.data.success) {
//         navigate("/movies");
//       } else {
//         setError(
//           res.data.message || `Failed to ${isEdit ? "update" : "add"} movie`
//         );
//       }
//     } catch (err) {
//       console.error(`${isEdit ? "Update" : "Add"} movie error:`, err);
//       setError(
//         err.response?.data?.message ||
//           `Failed to ${isEdit ? "update" : "add"} movie. Please try again.`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/movies");
//   };

//   if (loading && isEdit) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2>Loading movie details...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
//       {/* Top section with heading & back button */}
//       <div
//         style={{
//           position: "relative",
//           marginBottom: "30px",
//           textAlign: "center",
//         }}
//       >
//         <button
//           type="button"
//           onClick={handleCancel}
//           style={{
//             position: "absolute",
//             left: 0,
//             top: "50%",
//             transform: "translateY(-50%)",
//             padding: "8px 16px",
//             backgroundColor: "#6c757d",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Back
//         </button>
//         <h2 style={{ margin: 0 }}>{isEdit ? "Edit Movie" : "Add New Movie"}</h2>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {error && (
//           <div
//             style={{
//               color: "red",
//               marginBottom: "20px",
//               padding: "10px",
//               backgroundColor: "#ffebee",
//               borderRadius: "4px",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         <div style={{ marginBottom: "20px" }}>
//           <label style={labelStyle}>Movie Name *</label>
//           <input
//             name="name"
//             type="text"
//             placeholder="Enter movie name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>

//         <div style={{ marginBottom: "20px" }}>
//           <label style={labelStyle}>Description *</label>
//           <textarea
//             name="description"
//             placeholder="Enter movie description"
//             value={form.description}
//             onChange={handleChange}
//             required
//             rows="4"
//             style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
//           />
//         </div>

//         <div style={{ marginBottom: "30px" }}>
//           <label style={labelStyle}>Movie Link</label>
//           <input
//             name="link"
//             type="url"
//             placeholder="Enter movie URL (optional)"
//             value={form.link}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//           <small style={{ color: "#666", fontSize: "12px" }}>
//             Optional: Add a link to watch the movie online
//           </small>
//         </div>

//         <div style={{ display: "flex", gap: "15px" }}>
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               flex: 1,
//               padding: "12px",
//               backgroundColor: loading ? "#ccc" : "#007bff",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: loading ? "not-allowed" : "pointer",
//               fontSize: "16px",
//               fontWeight: "bold",
//             }}
//           >
//             {loading
//               ? isEdit
//                 ? "Updating..."
//                 : "Adding..."
//               : isEdit
//               ? "Update Movie"
//               : "Add Movie"}
//           </button>

//           <button
//             type="button"
//             onClick={handleCancel}
//             disabled={loading}
//             style={{
//               flex: 1,
//               padding: "12px",
//               backgroundColor: "#6c757d",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: loading ? "not-allowed" : "pointer",
//               fontSize: "16px",
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// // Reusable inline styles
// const inputStyle = {
//   width: "100%",
//   padding: "12px",
//   borderRadius: "4px",
//   border: "1px solid #ddd",
//   fontSize: "14px",
// };

// const labelStyle = {
//   display: "block",
//   marginBottom: "5px",
//   fontWeight: "bold",
//   color: "#333",
// };
