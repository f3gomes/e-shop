import { Size } from "@/info/grid";

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg?: SelectedGridType;
  color?: string;
  quantity: number;
  price: number;
};

export type SelectedGridType = {
  color: string;
  colorCode: string;
  image: string;
  size?: Size;
  stock?: number;
};
