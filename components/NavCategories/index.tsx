"use client";

import { categories } from "@/info/categories";
import { usePathname, useSearchParams } from "next/navigation";

import { Container } from "../Container";
import { CategoryItem } from "../CategoryItem";

export function NavCategories() {
  const params = useSearchParams();
  const category = params?.get("category");

  const pathName = usePathname();
  const isMainPage = pathName === "/";

  if (!isMainPage) return null;

  return (
    <div className="bg-shop-white">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => {
            return (
              <CategoryItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={
                  category === item.label ||
                  (category === null && item.label === "Todas")
                }
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
