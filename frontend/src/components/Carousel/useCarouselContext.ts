import { useContext } from "react";
import { CarouselContext } from "./Carousel";

const useCarouselContext = () => {
  const context = useContext(CarouselContext);

  if (!context)
    throw new Error(
      "Carousel context used outisde of CarouselContext provider"
    );

  return context;
};

export default useCarouselContext;
