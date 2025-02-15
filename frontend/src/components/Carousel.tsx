import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GoChevronLeft, GoChevronRight, GoDotFill } from "react-icons/go";
import { GoDot } from "react-icons/go";
import products from "../../../backend/data/productsData";
import Rating from "./Rating";

const topProducts = products.slice(0, 6);
console.log(topProducts);

const Carousel: React.FC<{ slideInterval: number }> = ({
  slideInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, slideInterval]);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      handleNextSlide();
    }, slideInterval);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    startInterval();
  };

  const handlePrevSlide = () => {
    setCurrentIndex(
      (prevSlide) => (prevSlide - 1 + topProducts.length) % topProducts.length
    );
    resetInterval();
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevSlide) => (prevSlide + 1) % topProducts.length);
    resetInterval();
  };

  const goToSlide = (value: number) => {
    setCurrentIndex(value);
    resetInterval();
  };

  return (
    <div className="">
      {/* carousel container  */}
      <div className="relative grid grid-cols-2 h-96">
        {/* carousel slides*/}
        <div className="overflow-hidden">
          <ul
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {topProducts.map((prodotto, i) => (
              <li
                key={i}
                className="w-full flex-shrink-0 flex items-center justify-center"
              >
                <Link to={`/products/${prodotto.name}`}>
                  <img
                    className="object-contain h-96 w-full"
                    src={prodotto.image}
                    alt={prodotto.name}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* slide controllers */}
        <div className="absolute bottom-1/2 transform translate-y-1/2">
          <button onClick={handlePrevSlide}>
            <GoChevronLeft size={52} />
          </button>
        </div>

        <div className="absolute bottom-1/2 transform translate-y-1/2 right-0">
          <button onClick={handleNextSlide}>
            <GoChevronRight size={52} />
          </button>
        </div>

        <div className="absolute bottom-6 right-1/2 transform translate-x-1/2">
          <ul className="flex">
            {topProducts.map((_, i) => {
              return (
                <li key={i} className="">
                  {i === currentIndex ? (
                    <button>
                      <GoDotFill
                        size={34}
                        color="blue"
                        onClick={() => goToSlide(i)}
                      />
                    </button>
                  ) : (
                    <button>
                      <GoDot size={34} onClick={() => goToSlide(i)} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-8 text-center">
          <div className="clas flex items-center flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-wider">TOP RATED </h2>

            <h3 className="text-xl font-semibold text-primary">
              {topProducts[currentIndex].name}
            </h3>

            <p>{topProducts[currentIndex].description}</p>
            <Rating
              size="xl"
              value={topProducts[currentIndex].rating}
              reviews={topProducts[currentIndex].numReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
