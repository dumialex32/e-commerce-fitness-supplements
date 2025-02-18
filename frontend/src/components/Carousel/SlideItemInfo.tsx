import Rating from "../Rating";
import useCarouselContext from "./useCarouselContext";

const SlideItemInfo: React.FC = () => {
  const { data, currentIndex } = useCarouselContext();

  return (
    <div className="p-8 text-center bg-blue-50 rounded-md">
      <div className="clas flex items-center flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-wider">TOP RATED </h2>

        <h3 className="text-xl font-semibold text-primary">
          {data[currentIndex]?.name}
        </h3>

        <p>{data[currentIndex]?.description}</p>
        <Rating
          size="xl"
          value={data[currentIndex]?.rating}
          reviews={data[currentIndex]?.numReviews}
        />
      </div>
    </div>
  );
};

export default SlideItemInfo;
