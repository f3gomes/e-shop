"use client";

import Image from "next/image";
import { Rating } from "@mui/material";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/product";
import { MdOutlineStarOutline } from "react-icons/md";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, grid, reviews, price } = product;

  const router = useRouter();

  const productRating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-shop-footer-link bg-shop-card-bg rounded-sm p-2 transition duration-300 hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            alt={name}
            src={grid[0].image}
            className="w-full h-full object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-4">{truncateText(name)}</div>
        <div>
          <Rating
            readOnly
            value={productRating}
            emptyIcon={<MdOutlineStarOutline className="text-shop-star-text" />}
          />
        </div>
        <div>
          {product.reviews.length}{" "}
          {product.reviews.length === 1 ? "avaliação" : "avaliações"}
        </div>
        <div className="font-semibold">{formatPrice(price)}</div>
      </div>
    </div>
  );
}
