export interface Review {
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
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
  reviews: Review[];
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

// Product reviews
export interface ProductReviewsProps {
  reviews: Review[];
}

export interface ProductReviewProps {
  review: Review;
}
