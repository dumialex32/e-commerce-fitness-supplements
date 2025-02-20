const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const category = ["creatine", "pre-workout", "protein", "bcaa"];

const products = Array.from({ length: 60 }, (_, i) => {
  return {
    name: `supplement-item${i + 1}`,
    image: "/images/beast-preworkout.png",
    description: `Supplement ${i + 1} helps to enhance your workouts`,
    brand: "Unknown",
    category: `${category[getRandomNum(0, category.length)]}`,

    price: getRandomNum(15, 120),
    countInStock: getRandomNum(0, 500),
    rating: getRandomNum(1, 5),
    numReviews: getRandomNum(0, 1000),
  };
});

export default products;
