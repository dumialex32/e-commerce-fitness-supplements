import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type Direction = "horizontal" | "vertical";

const directionMap: Record<Direction, string> = {
  horizontal: "flex",
  vertical: "flex flex-col",
};

type StarSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<StarSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-3xl",
};

interface RatingProps {
  value?: number;
  reviews?: number;
  starNum?: number;
  direction?: Direction;
  size?: StarSize;
  interactive?: boolean;
  onSetRating?: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  reviews = 0,
  direction = "horizontal",
  starNum = 5,
  size = "md",
  interactive = false,
  onSetRating,
}) => {
  console.log(value);
  const [rate, setRate] = useState<number>(value);
  const [tempRate, setTempRate] = useState(0);

  useEffect(() => {
    setRate(value);
  }, [value]);

  const handleSetRate = (i: number) => {
    if (interactive) {
      setRate(i);
      onSetRating && onSetRating(i);
    }
  };

  const handleSetTempRate = (i: number) => {
    if (interactive) {
      setTempRate(i);
    }
  };

  return (
    <div className={`${directionMap[direction]} items-center gap-2`}>
      <ul className="flex gap-1">
        {Array.from({ length: starNum }, (_, i) => {
          const isFullStar = tempRate ? tempRate >= i + 1 : rate >= i + 1;
          const isHalfStar = tempRate ? tempRate >= i + 0.5 : rate >= i + 0.5;
          return (
            <li
              key={i}
              className={`${sizeMap[size]} text-yellow-300 ${
                interactive && "cursor-pointer"
              }`}
              onClick={() => handleSetRate(i + 1)}
              onMouseEnter={() => handleSetTempRate(i + 1)}
              onMouseLeave={() => handleSetTempRate(0)}
              role={interactive ? "button" : undefined}
              aria-label={`Rate ${i + 1} stars`}
            >
              {isFullStar ? (
                <FaStar />
              ) : isHalfStar ? (
                <FaStarHalfAlt />
              ) : (
                <FaRegStar />
              )}
            </li>
          );
        })}
      </ul>
      {reviews > 0 && (
        <p className="text-sm text-gray-400 font-semibold">{reviews} reviews</p>
      )}
    </div>
  );
};

export default Rating;
