import { ReactNode } from "react";

import Link from "next/link";
import { cn } from "@/utils/merge";
import { Redressed } from "next/font/google";

import { Container } from "../Container";
const font = Redressed({ subsets: ["latin"], weight: ["400"] });

interface NavBarProps {
  children?: ReactNode;
}

export function NavBar({ children }: NavBarProps) {
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href={"/"}
              className={cn(font.className, "font-bold text-2xl")}
            >
              E-Shop
            </Link>

            <div className="hidden md:block">Search</div>

            <div className="flex items-center gap-8 md:gap-12">
              <div>CartCount</div>
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
