"use client";

import { SetColor } from "@/components/SetColor";
import { SetQuantity } from "@/components/SetQuantity";
import { CartProductType, SelectedImgType } from "@/types/cart";
import { products } from "@/utils/data";
import { cn } from "@/utils/merge";
import { Rating } from "@mui/material";
import React, { useCallback, useState } from "react";

interface ProductDetailsProps {
  product: (typeof products)[0];
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const productRating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity < 99) {
      setCartProduct((prev) => {
        return { ...prev, quantity: prev.quantity++ };
      });
    }
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity > 1) {
      setCartProduct((prev) => {
        return { ...prev, quantity: prev.quantity-- };
      });
    }
  }, [cartProduct]);

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
        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyDecrease={handleQtyDecrease}
          handleQtyIncrease={handleQtyIncrease}
        />
        <Horizontal />
        <div>add to cart</div>
      </div>
    </div>
  );
}
