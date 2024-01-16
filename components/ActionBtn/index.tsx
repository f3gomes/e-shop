import { cn } from "@/utils/merge";
import { Tooltip } from "@mui/material";
import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  tooltip: string;
}

export function ActionBtn({
  icon: Icon,
  onClick,
  disabled,
  tooltip,
}: ActionBtnProps) {
  return (
    <Tooltip title={tooltip}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          disabled && "opacity-50 cursor-not-allowed",
          "flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 hover:border-[2px] transition duration-200"
        )}
      >
        <Icon size={18} />
      </button>
    </Tooltip>
  );
}
