import { ReactNode } from 'react';

interface NavBarProps {
  children?: ReactNode;
}

export function NavBar({ children }: NavBarProps) {
  return (
    <>
      <h1>NavBar</h1>
      {children}
    </>
  );
}
