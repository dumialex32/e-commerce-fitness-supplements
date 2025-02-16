import { useEffect, useRef, useState } from "react";
import { Product } from "../types/productsTypes/productTypes";

const useCarousel = (data: Product[], slideInterval: number) => {
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
    setCurrentIndex((prevSlide) => (prevSlide - 1 + data.length) % data.length);
    resetInterval();
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevSlide) => (prevSlide + 1) % data.length);
    resetInterval();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetInterval();
  };

  return {
    currentIndex,
    intervalRef,
    handleNextSlide,
    handlePrevSlide,
    goToSlide,
  };
};

export default useCarousel;
