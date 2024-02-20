import { cn } from "@/utils/merge";
import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn("max-w-[1920px] mx-auto xl:px-20 md:px-4 px-4", className)}
    >
      {children}
    </div>
  );
}
