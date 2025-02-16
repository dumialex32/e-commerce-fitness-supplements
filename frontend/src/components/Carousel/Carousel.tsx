import { createContext } from "react";

import CarouselControllers from "./CarouselControllers";
import useCarousel from "../../hooks/useCarousel";
import SlideItemInfo from "./SlideItemInfo";
import { Product } from "../../types/productsTypes/productTypes";
import CarouselItem from "./CarouselItem";

export interface CarouselProps {
  slideInterval: number;
  data: Product[];
}

export interface CarouselContext {
  currentIndex: number;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  slideInterval: number;
  data: Product[];
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
  goToSlide: (index: number) => void;
}

export const CarouselContext = createContext<CarouselContext | null>(null);

const Carousel: React.FC<CarouselProps> = ({ slideInterval = 5000, data }) => {
  const {
    currentIndex,
    intervalRef,
    handleNextSlide,
    handlePrevSlide,
    goToSlide,
  } = useCarousel(data, slideInterval);

  const value = {
    currentIndex,
    intervalRef,
    slideInterval,
    data,
    handleNextSlide,
    handlePrevSlide,
    goToSlide,
  };

  return (
    <CarouselContext.Provider value={value}>
      {/* carousel container  */}
      <div className="relative grid grid-cols-2 h-96">
        {/* carousel slides*/}
        <div className="overflow-hidden">
          <ul
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {data.map((item, i) => (
              <CarouselItem key={i} item={item} />
            ))}
          </ul>
        </div>

        {/* product slide info */}
        <SlideItemInfo />

        {/* slide controllers */}
        <CarouselControllers />
      </div>
    </CarouselContext.Provider>
  );
};

export default Carousel;
