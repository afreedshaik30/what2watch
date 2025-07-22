import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CarouselSlider({ movies }) {
  return (
    <div className="w-full h-[80vh] rounded-2xl overflow-hidden border-2 border-orange-500 shadow-lg relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={2500}
        transitionTime={500}
        swipeable
        showArrows
        className="h-full"
      >
        {movies
          .filter((item) => item.backdrop_path)
          .map((item) => (
            <div key={item.id} className="relative h-[80vh]">
              <img
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title || item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Overlay content */}
              <div className="absolute bottom-20 left-10 text-left z-10 max-w-xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-md mb-4">
                  {item.title || item.name}
                </h2>
                <p className="text-sm md:text-base text-white/60 mb-2 line-clamp-2">
                  {item.overview?.length
                    ? item.overview
                    : "No description available."}
                </p>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default CarouselSlider;
