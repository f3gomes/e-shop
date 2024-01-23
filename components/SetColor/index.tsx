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
    <div className="flex gap-4 items-center">
      <span className="font-semibold">COR:</span>
      <div className="flex gap-1">
        {gridSorted.map((item: any) => {
          return (
            <div
              key={item.color}
              onClick={() => handleColorSelect(item)}
              className={cn(
                "h-7 w-7 rounded-full border-teal-300 flex items-center justify-center",
                cartProduct.grid?.color === item.color
                  ? "border-[1.5px]"
                  : "border-none"
              )}
            >
              <button
                disabled={item.stock === 0}
                style={{ background: item.colorCode }}
                className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer disabled:cursor-not-allowed"
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
