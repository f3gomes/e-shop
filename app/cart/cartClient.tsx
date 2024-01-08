"use client";

import { CartItem } from "@/components/CartItem";
import { Heading } from "@/components/Heading";
import { CustomButton } from "@/components/ProductAddButton";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";

export default function CartClient() {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Seu carrinho está vazio</div>

        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Ver Produtos</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Seu Carrinho" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUTO</div>
        <div className="justify-self-center">PREÇO</div>
        <div className="justify-self-center">QTD</div>
        <div className="justify-self-end">TOTAL</div>
      </div>

      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[140px]">
          <CustomButton
            label="Limpar carrinho"
            onClick={() => {}}
            small
            outline
          />
        </div>

        <div className="text-sm flex flex-col gap-1 items-start">
          <div>
            <div className="flex justify-between w-64 text-base font-semibold">
              <span>Subtotal</span>
              <span>R$ 1,000</span>
            </div>
            <p>Frete e Taxas</p>

            <CustomButton label="Confirmar" onClick={() => {}} />

            <Link
              href={"/"}
              className="text-slate-500 flex items-center gap-1 mt-2"
            >
              <MdArrowBack />
              <span>Continar comprando</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
