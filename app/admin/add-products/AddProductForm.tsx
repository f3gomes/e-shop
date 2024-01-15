"use client";

import { CategoryInput } from "@/components/CategoryInput";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { categories } from "@/utils/categories";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      grid: [],
      price: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <>
      <Heading title="Adicionar Produto" center />

      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="price"
        label="Preço"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="brand"
        label="Marca"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="description"
        label="Descrição"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <CustomCheckbox
        id="inStock"
        register={register}
        label="Disponível em estoque"
      />

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Selecione uma categoria</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "Todas") {
              return null;
            }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  icon={item.icon}
                  label={item.label}
                  selected={category === item.label}
                  onClick={(category) => setCustomValue("category", category)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
