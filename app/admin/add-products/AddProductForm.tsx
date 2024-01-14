"use client";

import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
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
    </>
  );
}
