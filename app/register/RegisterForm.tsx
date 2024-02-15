"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { AiOutlineGoogle } from "react-icons/ai";
import { CustomButton } from "@/components/CustomButton";
import { SafeUser } from "@/types";
import { cepMask } from "@/utils/masks";

interface RegisterFormProps {
  currentUser: SafeUser | any;
}

export default function RegisterForm({ currentUser }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      city: "",
      line1: "",
      line2: "",
      email: "",
      state: "",
      password: "",
      country: "BR",
      postal_code: "",
      number: "",
      comp: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Conta criada!");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Bem vindo!");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Algo deu errado!"))
      .finally(() => setIsLoading(false));
  };

  const handleGetAddress = async (event: any) => {
    const { value } = event.target;

    if (value) {
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        const address = await res.data;

        setValue("state", address.uf);
        setValue("line2", address.bairro);
        setValue("city", address.localidade);
        setValue("line1", address.logradouro);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []); // eslint-disable-line

  if (currentUser) {
    return <p className="text-center">Login Efetuado. Redirecionando...</p>;
  }

  return (
    <>
      <Heading title="Crie sua conta" />

      <CustomButton
        outline
        icon={AiOutlineGoogle}
        label="Cadastrar com Google"
        disabled
      />
      <hr className="bg-shop-text-sub w-full h-px" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        <Input
          id="name"
          type="text"
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

        <Heading title="Endereço de Entrega" />

        <Input
          id="postal_code"
          type="text"
          label="CEP"
          onBlur={handleGetAddress}
          disabled={isLoading}
          register={register}
          errors={errors}
          maxLength={9}
          onChange={(event) => {
            const { value } = event.target;
            event.target.value = cepMask(value);
          }}
          required
        />

        <Input
          id="line1"
          type="text"
          label="Rua"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <div className="flex gap-2">
          <Input
            id="number"
            type="text"
            label="Número"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="line2"
            type="text"
            label="Bairro"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>

        <Input
          id="comp"
          type="text"
          label="Complemento"
          disabled={isLoading}
          register={register}
          errors={errors}
        />

        <div className="flex gap-2">
          <Input
            id="city"
            label="Cidade"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="state"
            label="Estado"
            disabled={isLoading}
            register={register}
            errors={errors}
            maxLength={2}
            required
          />
        </div>

        <CustomButton
          type="submit"
          label={isLoading ? "Carregando..." : "Registrar"}
        />
      </form>

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
