import { ReactNode } from "react";

interface UserMenuItemProps {
  children: ReactNode;
  onClick: () => void;
}

export function UserMenuItem({ children, onClick }: UserMenuItemProps) {
  return (
    <div
      onClick={onClick}
      className=" px-4 py-3 hover:bg-neutral-100 transition duration-300"
    >
      {children}
    </div>
  );
}
