import { cn } from "@/utils/merge";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export function Input({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: InputProps) {
  return (
    <div className="w-full relative">
      <input
        id={id}
        type={type}
        placeholder=""
        autoComplete="off"
        disabled={disabled}
        {...register(id, { required })}
        className={cn(
          "peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed",
          errors[id]
            ? "border-rose-400 focus:border-rose-400 text-rose-500"
            : "border-slate-300 focus:border-slate-300 text-slate-400"
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
