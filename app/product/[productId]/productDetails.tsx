"use client";

import { products } from "@/utils/data";
import { cn } from "@/utils/merge";
import { Rating } from "@mui/material";
import React from "react";

interface ProductDetailsProps {
  product: (typeof products)[0];
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const productRating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>Images</div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>

        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />

        <div>
          <span className="font-semibold">Category: {product.brand}</span>
        </div>
        <div
          className={cn(product.inStock ? "text-teal-400" : "text-rose-400")}
        >
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        <div>color</div>
        <Horizontal />
        <div>quantity</div>
        <Horizontal />
        <div>add to cart</div>
      </div>
    </div>
  );
}
