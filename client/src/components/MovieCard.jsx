import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function MovieCard({ media }) {
  const title = media.title || media.name;
  const rating = media.vote_average?.toFixed(1) || "N/A";
  const mediaType = media.media_type || (media.name ? "tv" : "movie");

  return (
    <Link to={`/${mediaType}/${media.id}`} className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden relative shadow hover:shadow-lg transition">
        <img
          src={
            media.poster_path
              ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
              : "/placeholder-poster.jpg"
          }
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {rating !== "N/A" && (
          <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-lg flex items-center gap-1 text-xs shadow">
            <Star size={12} fill="currentColor" />
            {rating}
          </div>
        )}
        <div className="p-3">
          <h3 className="text-white text-sm font-semibold line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
