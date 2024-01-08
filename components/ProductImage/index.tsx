"use client";

import { CartProductType, SelectedImgType } from "@/types/cart";
import { cn } from "@/utils/merge";
import Image from "next/image";

interface ProductImageProps {
  product: any;
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

export function ProductImage({
  product,
  cartProduct,
  handleColorSelect,
}: ProductImageProps) {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-items-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={cn(
                "relative w-[80%] aspect-square rounded border-teal-300",
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              )}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      <div className="col-span-5 relative aspect-square">
        <Image
          fill
          priority
          alt={cartProduct.name}
          src={cartProduct.selectedImg.image}
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
}
