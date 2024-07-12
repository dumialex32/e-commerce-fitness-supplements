export interface ProductType {
  id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

const products: ProductType[] = [
  {
    id: "1",
    name: "Beast workout",
    image: "/images/beast-preworkout.png",
    description: "A preworkout to enhance your workouts",
    brand: "Beast",
    category: "Pre-workouts",
    price: 39.0,
    countInStock: 9,
    rating: 4.1,
    numReviews: 2232,
  },
  {
    id: "2",
    name: "Gold Whey",
    image: "/images/gold-whey.png",
    description:
      "A Protein poweder to help your lean muscle growth and to enhance your workouts",
    brand: "Beast",
    category: "Whey protein",
    price: 55.5,
    countInStock: 0,
    rating: 4.9,
    numReviews: 1222,
  },
  {
    id: "3",
    name: "ON glutamine",
    image: "/images/on-glutamine.png",
    description:
      "A powerfull amino-acid to help you recover from your workouts more fast",
    brand: "Beast",
    category: "Recovery",
    price: 14.8,
    countInStock: 11,
    rating: 3,
    numReviews: 132,
  },
  {
    id: "4",
    name: "HW fishoil",
    image: "/images/fishoil-hw.png",
    description:
      "Boost your recover and help your joints with the benefits provided by the EPA and DHA from our fishoil",
    brand: "Beast",
    category: "Recovery",
    price: 34.0,
    countInStock: 188,
    rating: 4.0,
    numReviews: 199,
  },
  {
    id: "5",
    name: "ON creatine",
    image: "/images/creatine-on.png",
    description:
      "Creatine monohydrate made from CreaPure to enhance your workouts and recover faster",
    brand: "Beast",
    category: "Recovery",
    price: 39.0,
    countInStock: 995,
    rating: 4.5,
    numReviews: 12,
  },
  {
    id: "6",
    name: "Xtreme Whey Protein",
    image: "/images/xtreme-whey.png",
    description:
      "Our whey protein contain 23g of protein per scoop to help you build lean muscle",
    brand: "Beast",
    category: "Whey protein",
    price: 55.0,
    countInStock: 355,
    rating: 4.5,
    numReviews: 66,
  },
  {
    id: "7",
    name: "ON BCAA",
    image: "/images/on-bcaa.png",
    description:
      "200 capsulses of BCAA from ON for muscle preserve while on deficit",
    brand: "Beast",
    category: "Muscle mentain",
    price: 43.0,
    countInStock: 783,
    rating: 4.2,
    numReviews: 156,
  },
];

export default products;
