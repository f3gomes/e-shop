import { cn } from "@/utils/merge";
import { IconType } from "react-icons";

interface StatusProps {
  bg: string;
  text: string;
  color: string;
  icon: IconType;
}

export function Status({ text, icon: Icon, bg, color }: StatusProps) {
  return (
    <div className={cn("px-1 rounded flex items-center gap-1", bg, color)}>
      {text} <Icon size={15} />
    </div>
  );
}
