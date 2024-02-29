"use client";

import { cn } from "@/utils/merge";
import { IconType } from "react-icons";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  small?: boolean;
  custom?: string;
  outline?: boolean;
  disabled?: boolean;
  icon?: IconType;
  className?: string;
}

export function CustomButton({
  label,
  small,
  custom,
  outline,
  disabled,
  icon: Icon,
  className,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        className,
        "disabled:opacity-70 disabled:cursor-not-allowed rounded-md transition duration-300 w-full border-shop-btn-bg flex items-center justify-center gap-2",
        outline
          ? "bg-shop-btn-outline-bg text-shop-btn-outline-text"
          : "bg-shop-btn-bg hover:bg-shop-btn-hover active:bg-shop-btn-active text-shop-btn-text",
        small
          ? "text-sm font-light py-1 px-2 border-[1px]"
          : "text-base font-semibold py-3 px-4 border-2",
        custom ? custom : ""
      )}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
}
