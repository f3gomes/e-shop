"use client";

import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { CustomButton } from "@/components/ProductAddButton";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
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
      <Heading title="Entre na sua conta" />

      <CustomButton
        outline
        onClick={() => {}}
        icon={AiOutlineGoogle}
        label="Continuar com Google"
      />
      <hr className="bg-slate-300 w-full h-px" />

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
        label={isLoading ? "Entrando..." : "Entrar"}
        onClick={handleSubmit(onSubmit)}
      />

      <p className="text-sm flex gap-1">
        Não tem uma conta?
        <Link
          href={"/register"}
          className="font-semibold hover:opacity-60 transition duration-300"
        >
          Cadastrar
        </Link>
      </p>
    </>
  );
}
