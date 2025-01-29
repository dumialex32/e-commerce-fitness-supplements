export interface IReview {
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
  reviews: IReview[];
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

export interface IProductPayload {
  name: string;
  price: number;
  category: string;
  brand: string;
  countInStock: number;
  description: string;
  image: File | string;
}

// Product reviews
export interface ProductReviewsProps {
  reviews: IReview[];
}

export interface IProductReviewProps {
  review: IReview;
}
