"use client";

import { CartProductType, SelectedGridType } from "@/types/cart";
import { cn } from "@/utils/merge";
import { useEffect, useState } from "react";

interface SetColorProps {
  grid: SelectedGridType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedGridType) => void;
}

export function SetColor({
  grid,
  cartProduct,
  handleColorSelect,
}: SetColorProps) {
  const [gridSorted, setGridSorted] = useState<any>([]);

  useEffect(() => {
    const newGrid = grid.sort((a: any, b: any) => b.stock - a.stock);
    setGridSorted(newGrid);
  }, []); // eslint-disable-line

  return (
    <div className="flex gap-3 items-center">
      <span className="font-semibold">Cor:</span>
      <div className="flex gap-1">
        {gridSorted.map((item: SelectedGridType) => {
          return (
            <div
              key={item.color}
              onClick={() => handleColorSelect(item)}
              className={cn(
                "h-7 w-7 rounded-full border-teal-300 flex items-center justify-center",
                cartProduct.grid?.color === item.color
                  ? "border-[2px]"
                  : "border-none"
              )}
            >
              <button
                disabled={item?.stock! <= 0}
                style={{ background: item.colorCode }}
                className="h-6 w-6 rounded-full cursor-pointer disabled:cursor-not-allowed"
              >
                {/* <span>{item.size}</span> */}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
