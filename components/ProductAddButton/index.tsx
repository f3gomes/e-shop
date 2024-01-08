"use client";

import { cn } from "@/utils/merge";
import { IconType } from "react-icons";

interface ProductAddButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ProductAddButton({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}: ProductAddButtonProps) {
  return (
    <button
      className={cn(
        "disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition duration-300 w-full border-slate-700 flex items-center justify-center gap-2",
        outline ? "bg-white text-slate-700" : "bg-slate-700 text-white",
        small
          ? "text-sm font-light py-1 px-2 border-[1px]"
          : "text-base font-semibold py-3 px-4 border-2",
        custom ? custom : ""
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
}
