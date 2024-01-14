import { Sizes } from "./product";

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg?: SelectedImgType;
  color?: string;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
  size?: Sizes;
  stock?: number;
};
