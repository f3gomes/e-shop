"use client";

import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { CustomButton } from "@/components/ProductAddButton";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <>
      <Heading title="Crie sua conta" />

      <CustomButton
        outline
        onClick={() => {}}
        icon={AiOutlineGoogle}
        label="Cadastrar com Google"
      />
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="email"
        label="E-mail"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Senha"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <CustomButton
        label={isLoading ? "Carregando..." : "Registrar"}
        onClick={handleSubmit(onSubmit)}
      />

      <p className="text-sm flex gap-1">
        Já tem uma conta?
        <Link
          href={"/login"}
          className="font-semibold hover:opacity-60 transition duration-300"
        >
          Entrar
        </Link>
      </p>
    </>
  );
}
