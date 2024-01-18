import { ReactNode } from "react";

interface FooterListProps {
  children: ReactNode;
}

export function FooterList({ children }: FooterListProps) {
  return (
    <div className="w-fit mb-6 flex flex-col gap-2">
      {children}
    </div>
  );
}
