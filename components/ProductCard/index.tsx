"use client";

import Image from "next/image";
import { Rating } from "@mui/material";
import { products } from "@/utils/data";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";

interface ProductCardProps {
  product: (typeof products)[0];
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, images, reviews, price } = product;

  const productRating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  return (
    <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition duration-300 hover:scale-105 text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            alt={name}
            src={images[0].image}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(price)}</div>
      </div>
    </div>
  );
}
