import { Link } from "react-router-dom";
import { Product } from "../../types/productsTypes/productTypes";

const CarouselItem: React.FC<{ item: Product }> = ({ item }) => {
  return (
    <li className="w-full flex-shrink-0 flex items-center justify-center">
      <Link to={`/products/${item.name}`}>
        <img
          className="object-contain h-96 w-full"
          src={item.image}
          alt={item.name}
        />
      </Link>
    </li>
  );
};

export default CarouselItem;
