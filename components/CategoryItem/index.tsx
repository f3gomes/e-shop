import { cn } from "@/utils/merge";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryItemProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

export function CategoryItem({
  label,
  icon: Icon,
  selected,
}: CategoryItemProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "Todas") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        selected
          ? "border-b-shop-title text-shop-category-selected"
          : "border-transparent text-shop-link",
        "flex items-center gap-1 p-2 border-b-2 hover:opacity-65 transition duration-200 cursor-pointer"
      )}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}
