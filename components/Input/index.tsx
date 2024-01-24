import { cn } from "@/utils/merge";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  min?: number;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  size?: string;
  length?: number;
}

export function Input({
  id,
  min,
  type,
  label,
  disabled,
  required,
  register,
  errors,
  length = 255,
  size = "w-full",
}: InputProps) {
  return (
    <div className="w-full relative">
      <input
        id={id}
        min={min}
        type={type}
        placeholder=""
        autoComplete="off"
        maxLength={length}
        disabled={disabled}
        {...register(id, { required })}
        className={cn(
          size,
          "peer p-4 pt-6 outline-none bg-shop-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed",
          errors[id]
            ? "border-rose-400 focus:border-rose-400 text-rose-500"
            : "border-shop-line focus:border-shop-line text-shop-input-text"
        )}
      />
      <label
        htmlFor={id}
        className="absolute cursor-text text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
    </div>
  );
}
