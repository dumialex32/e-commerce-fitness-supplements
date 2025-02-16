import {
  GoChevronLeft,
  GoChevronRight,
  GoDot,
  GoDotFill,
} from "react-icons/go";
import useCarouselContext from "./useCarouselContext";

const CarouselControllers: React.FC = () => {
  const { handlePrevSlide, data, goToSlide, currentIndex, handleNextSlide } =
    useCarouselContext();
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
      {/* Left Arrow */}
      <button onClick={handlePrevSlide} aria-label="Previous slide">
        <GoChevronLeft size={42} className="hover:text-blue-500 transition" />
      </button>

      {/* Dot Controllers */}
      <ul className="flex space-x-2">
        {data.map((_, i) => (
          <li key={i}>
            <button
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === currentIndex ? (
                <GoDotFill size={18} className="text-blue-500" />
              ) : (
                <GoDot
                  size={18}
                  className="text-gray-400 hover:text-blue-500 transition"
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Arrow */}
      <button onClick={handleNextSlide} aria-label="Next slide">
        <GoChevronRight size={42} className="hover:text-blue-500 transition" />
      </button>
    </div>
  );
};

export default CarouselControllers;
