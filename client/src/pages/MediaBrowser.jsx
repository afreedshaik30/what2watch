import React, { useEffect, useState } from "react";
import {
  fetchGenres,
  fetchLanguages,
  fetchByGenre,
  fetchByLanguage,
  searchMedia,
  fetchPopular,
} from "../services/tmdb";

import MovieCard from "../components/MovieCard";
import { Filter, Globe } from "lucide-react";

export default function MediaBrowser({ mediaType }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    fetchGenres(mediaType).then((res) => {
      if (res?.data) setGenres(res.data.genres);
    });
    fetchLanguages().then(setLanguages);
  }, [mediaType]);

  useEffect(() => {
    if (search.trim()) {
      searchMedia(mediaType, search).then((res) =>
        setResults(res.data?.results || [])
      );
    } else if (selectedGenre) {
      fetchByGenre(mediaType, selectedGenre).then((res) =>
        setResults(res.data?.results || [])
      );
    } else if (selectedLang) {
      fetchByLanguage(mediaType, selectedLang).then((res) =>
        setResults(res.data?.results || [])
      );
    } else {
      // Load popular content by default
      fetchPopular(mediaType).then((res) =>
        setResults(res.data?.results || [])
      );
    }
  }, [search, selectedGenre, selectedLang, mediaType]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-white">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder={`Search ${mediaType === "tv" ? "shows" : "movies"}...`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedGenre("");
            setSelectedLang("");
          }}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded w-full sm:w-64"
        />

        <div className="flex items-center gap-2">
          <Filter size={16} />
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setSelectedLang("");
              setSearch("");
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="">Filter by Genre</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Globe size={16} />
          <select
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.target.value);
              setSelectedGenre("");
              setSearch("");
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded"
          >
            <option value="">Filter by Language</option>
            {languages.map((l) => (
              <option key={l.iso_639_1} value={l.iso_639_1}>
                {l.english_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {mediaType === "tv" ? "📺 Show Results" : "🎬 Movie Results"}
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-400 italic">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {results
            .filter((m) => m.poster_path)
            .map((item) => (
              <MovieCard key={item.id} media={item} />
            ))}
        </div>
      )}
    </div>
  );
}
