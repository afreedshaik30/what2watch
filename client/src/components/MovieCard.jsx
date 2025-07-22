import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function MovieCard({ media }) {
  const title = media.title || media.name;
  const rating = media.vote_average?.toFixed(1) || "N/A";
  const mediaType = media.media_type || (media.name ? "tv" : "movie");

  return (
    <Link to={`/${mediaType}/${media.id}`} className="block group w-full">
      <div className="rounded-xl overflow-hidden relative bg-sky-950 shadow-xl hover:shadow-2xl hover:scale-[1.03] transform transition duration-300 group">
        {/* Poster Image */}
        <div className="relative w-full aspect-[2/3] overflow-hidden">
          <img
            src={
              media.poster_path
                ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                : "/placeholder-poster.jpg"
            }
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />

          {/* Rating Badge */}
          {rating !== "N/A" && (
            <div className="absolute top-2 right-2 backdrop-blur-sm bg-black/50 text-yellow-400 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-md z-10">
              <Star size={12} fill="currentColor" />
              {rating}
            </div>
          )}
        </div>

        {/* Title */}
        <div className="px-2 py-2 min-h-[56px] flex items-center">
          <h3 className="text-white text-sm font-semibold leading-snug tracking-tight line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
