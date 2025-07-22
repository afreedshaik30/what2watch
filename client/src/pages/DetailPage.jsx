import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMediaDetails, fetchCredits, fetchVideos } from "../services/tmdb";
import { ChevronLeft } from "lucide-react";
function DetailPage() {
  const { id, type } = useParams(); // get both type and id from route
  const [item, setItem] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetails = async () => {
      const mediaType = type === "tv" ? "tv" : "movie"; // default to movie
      const { data: details } = await fetchMediaDetails(mediaType, id);
      if (!details) return;

      setItem(details);

      const { data: credits } = await fetchCredits(mediaType, id);
      const { data: vids } = await fetchVideos(mediaType, id);

      setCast(credits?.cast?.slice(0, 8) || []);
      setVideos(vids?.results || []);
    };

    loadDetails();
  }, [id, type]);

  if (!item)
    return <p className="text-center py-8 text-gray-400">Loading...</p>;

  const title = item.title || item.name;

  return (
    <div className="p-4 md:p-8 text-white min-h-screen">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={title}
            className="w-48 rounded-lg"
          />
          <div className="px-4 py-16 md:px-10 lg:mx-20 max-w-screen-lg mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-orange-400">
              {title}
            </h1>

            <p className="text-sm md:text-base text-gray-400 mb-1">
              <span className="font-semibold text-white">Rating:</span>{" "}
              {item.vote_average}/10
            </p>

            {item.genres && (
              <p className="text-sm md:text-base text-gray-400 mb-3">
                <span className="font-semibold text-white">Genres:</span>{" "}
                {item.genres.map((g) => g.name).join(", ")}
              </p>
            )}

            <p className="text-sm md:text-base text-gray-300">
              {item.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Cast */}
      {cast.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Top Cast</h2>
          <div className="flex overflow-x-auto gap-4 no-scrollbar">
            {cast
              .filter((c) => c.profile_path)
              .map((c) => (
                <div
                  key={c.cast_id || c.credit_id}
                  className="min-w-[80px] text-center"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${c.profile_path}`}
                    alt={c.name}
                    className="w-full rounded-lg mb-2"
                  />
                  <p className="text-sm text-white truncate">{c.name}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Trailers</h2>
          <div className="flex overflow-x-auto gap-4 no-scrollbar">
            {videos
              .filter((v) => v.site === "YouTube" && v.type === "Trailer")
              .map((video) => (
                <iframe
                  key={video.id}
                  className="min-w-[380px] aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                ></iframe>
              ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 flex items-center gap-2 text-orange-500 font-medium border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
