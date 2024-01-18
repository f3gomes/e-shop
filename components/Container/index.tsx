import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className=" max-w-[1920px] mx-auto xl:px-20 md:px-4 px-4">
      {children}
    </div>
  );
}
