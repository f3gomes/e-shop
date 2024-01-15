"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

export function CustomCheckbox({
  id,
  label,
  disabled,
  register,
}: CustomCheckboxProps) {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input
        id={id}
        placeholder=""
        type="checkbox"
        disabled={disabled}
        {...register(id)}
        className="cursor-pointer"
      />
      <label htmlFor={id} className="font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
}
