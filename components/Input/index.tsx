import { cn } from "@/utils/merge";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  size?: any;
}

export function Input({
  id,
  min,
  label,
  required = true,
  register,
  errors,
  size = "w-full",
}: InputProps) {
  const deafaultClass =
    "peer p-4 pt-6 outline-none bg-shop-input-bg font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <div className="w-full relative">
      <input
        id={id}
        min={min}
        placeholder=""
        autoComplete="off"
        {...register(id, { required })}
        className={cn(
          size,
          deafaultClass,
          errors[id]
            ? "border-rose-400 focus:border-rose-400 text-rose-500"
            : "border-shop-input-border focus:border-shop-input-border text-shop-input-text"
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
