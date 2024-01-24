import { cn } from "@/utils/merge";
import { IconType } from "react-icons";

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

export function AdminNavItem({
  selected,
  icon: Icon,
  label,
}: AdminNavItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-shop-title transition cursor-pointer",
        selected
          ? "border-b-slate-800 text-shop-title"
          : "border-transparent text-shop-link"
      )}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
}
