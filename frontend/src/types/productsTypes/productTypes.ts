interface IReviews {
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  brand: string;
  category: string;
  countInStock: number;
  createdAt: string;
  description: string;
  image: string;
  name: string;
  numReviews: number;
  price: number;
  rating: number;
  reviews: IReviews[];
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}
