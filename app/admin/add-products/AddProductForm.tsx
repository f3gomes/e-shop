"use client";

import React, { useCallback, useEffect, useState } from "react";

import { FieldValues, useForm } from "react-hook-form";

import { grid } from "@/utils/grid";
import { Input } from "@/components/Input";
import { GridType } from "@/types/product";
import { Heading } from "@/components/Heading";
import { categories } from "@/utils/categories";
import { TextArea } from "@/components/TextArea";
import { SelectGrid } from "@/components/SelectGrid";
import { CategoryInput } from "@/components/CategoryInput";
import { CustomCheckbox } from "@/components/CustomCheckbox";

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<GridType[] | null>();
  const [isProductCreatesd, setIsProductCreated] = useState(false);

  const {
    watch,
    reset,
    setValue,
    register,
    handleSubmit,
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

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]); // eslint-disable-line

  useEffect(() => {
    if (isProductCreatesd) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreatesd]); // eslint-disable-line

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const addGridToState = useCallback((value: GridType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeGridToState = useCallback((value: GridType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );

        return filteredImages;
      }

      return prev;
    });
  }, []);

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
        min={0}
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

      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Selecione as cores e tamanhos disponíveis e adicione as fotos do
            produto.
          </div>

          <div className="text-sm">
            Defina também o estoque inicial de cada item
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {grid.map((item) => {
            return (
              <SelectGrid
                item={item}
                key={item.colorCode}
                addGridToState={addGridToState}
                removeGridToState={removeGridToState}
                isProductCreated={false}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
