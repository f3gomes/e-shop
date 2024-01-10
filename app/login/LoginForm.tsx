"use client";

import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";
import { SafeUser } from "@/types";
import { signIn } from "next-auth/react";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { AiOutlineGoogle } from "react-icons/ai";
import { CustomButton } from "@/components/ProductAddButton";

interface LoginFormProps {
  currentUser: SafeUser | any;
}

export default function LoginForm({ currentUser }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []); // eslint-disable-line

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Bem vindo!");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">Login Efetuado. Redirecionando...</p>;
  }

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
