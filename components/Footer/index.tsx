import { ReactNode } from "react";

interface FooterProps {
  children?: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return <footer>Footer</footer>;
}
