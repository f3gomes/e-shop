"use client";

import { SelectedGridType } from "@/types/cart";
import { IProduct } from "@/types/product";
import { cn } from "@/utils/merge";
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  product: IProduct;
}

export function ProductImage({ product }: ProductImageProps) {
  const [selectedImage, setSeletedImage] = useState<IProduct["grid"][0]>({
    color: "",
    colorCode: "",
    image: product.grid[0].image,
    size: undefined,
    stock: 0,
  });

  const handleImageSelect = (grid: IProduct["grid"][0]) => {
    setSeletedImage(grid);
  };

  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-items-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.grid.map((item: IProduct["grid"][0]) => {
          return (
            <div
              key={item.color}
              onClick={() => handleImageSelect(item)}
              className={cn(
                "relative w-[80%] aspect-square rounded border-teal-300 active:border-[2px]"
              )}
            >
              <Image
                fill
                src={item.image}
                alt={item.color}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          );
        })}
      </div>

      <div className="col-span-5 relative aspect-square">
        <Image
          fill
          priority
          alt={selectedImage.color}
          src={selectedImage.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
}
