"use client";

import { cn } from "@/utils/merge";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

export function CategoryInput({
  selected,
  label,
  icon: Icon,
  onClick,
}: CategoryInputProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "rounded-xl border-[3px] p-4 flex  flex-col items-center gap-2 hover:border-shop-btn-border transition cursor-pointer",
        selected ? "border-shop-btn-border/80" : "border-shop-card-border"
      )}
    >
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  );
}
