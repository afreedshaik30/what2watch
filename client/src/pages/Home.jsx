import React, { useEffect, useState } from "react";
import { fetchTrending } from "../services/tmdb";
import CarouselSlider from "../components/CarouselSlider";
import MovieCard from "../components/MovieCard";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);

  useEffect(() => {
    fetchTrending("movie").then((res) =>
      setTrendingMovies(res.data.results?.slice(0, 10) || [])
    );
    fetchTrending("tv").then((res) =>
      setTrendingTV(res.data.results?.slice(0, 10) || [])
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white bg-gray-900">
      {/* Carousel for Movies */}
      {trendingMovies.length > 0 && (
        <div className="mb-8">
          <CarouselSlider movies={trendingMovies.slice(0, 5)} />
        </div>
      )}

      {/* Top 10 Trending Movies */}
      <h2 className="text-xl font-semibold mb-4">🔥 Top 10 Trending Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
        {trendingMovies
          .filter((m) => m.poster_path)
          .map((movie) => (
            <MovieCard key={movie.id} media={movie} />
          ))}
      </div>

      {/* Top 10 Trending TV Shows */}
      <h2 className="text-xl font-semibold mb-4">
        📺 Top 10 Trending TV Shows
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trendingTV
          .filter((tv) => tv.poster_path)
          .map((show) => (
            <MovieCard key={show.id} media={show} />
          ))}
      </div>
    </div>
  );
}

export default Home;
