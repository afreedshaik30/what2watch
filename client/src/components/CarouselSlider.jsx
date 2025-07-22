import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselSlider({ movies }) {
  return (
    <div className="w-full h-[40vh] rounded-lg overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={600}
        swipeable
        showArrows
        className="h-full"
      >
        {movies
          .filter((movie) => movie.backdrop_path)
          .map((movie) => (
            <div key={movie.id} className="h-[40vh]">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4">
                <h2 className="text-white text-lg font-semibold">
                  {movie.title}
                </h2>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default CarouselSlider;
