"use client";

import { CartProductType, SelectedGridType } from "@/types/cart";
import { cn } from "@/utils/merge";

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
  return (
    <div className="flex gap-4 items-center">
      <span className="font-semibold">COR:</span>
      <div className="flex gap-1">
        {grid.map((item) => {
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
              <div
                style={{ background: item.colorCode }}
                className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
