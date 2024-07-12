import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type Direction = "horizontal" | "vertical";

interface RatingProps {
  value: number;
  reviews: number;
  starNum: number;
  direction: Direction;
}
const directionMap: Record<Direction, string> = {
  horizontal: "flex",
  vertical: "flex flex-col",
};

const Rating: React.FC<RatingProps> = ({
  value,
  reviews,
  direction = "horizontal",
  starNum,
}) => {
  return (
    <div className={`${directionMap[direction]} gap-2`}>
      <div className="flex gap-1">
        {Array.from({ length: starNum }, (_, i) => (
          <span className="text-yellow-300 text-xl" key={i}>
            {value >= i + 1 ? (
              <FaStar />
            ) : value >= i - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-400 font-semibold">{reviews} reviews</p>
    </div>
  );
};

export default Rating;
