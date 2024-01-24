"use client";

import { cn } from "@/utils/merge";
import { IconType } from "react-icons";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  label: string;
  small?: boolean;
  custom?: string;
  outline?: boolean;
  disabled?: boolean;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function CustomButton({
  label,
  small,
  type = "button",
  custom,
  outline,
  disabled,
  icon: Icon,
  onClick,
  className,
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        className,
        "disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition duration-300 w-full border-shop-btn flex items-center justify-center gap-2",
        outline ? "bg-shop-white text-shop-title" : "bg-shop-btn text-shop-white",
        small
          ? "text-sm font-light py-1 px-2 border-[1px]"
          : "text-base font-semibold py-3 px-4 border-2",
        custom ? custom : ""
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
}
