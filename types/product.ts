import { Sizes } from "@/info/grid";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock?: boolean;
  grid: Grid[];
  reviews: Review[];
}

export interface Grid {
  color: string;
  colorCode: string;
  image: string;
  size?: Sizes;
  stock?: number;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: string;
  hashedPassword: null;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export type GridType = {
  color: string;
  colorCode: string;
  image: File | null;
  size?: Sizes | string;
  stock?: number;
};

export type UploadedGridType = {
  color: string;
  colorCode: string;
  image: string;
  size?: Sizes;
  stock?: number;
};
