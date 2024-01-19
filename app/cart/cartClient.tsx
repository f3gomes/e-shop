"use client";

import React, { useState } from "react";

import Link from "next/link";
import { SafeUser } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import { Heading } from "@/components/Heading";
import { CartItem } from "@/components/CartItem";
import { formatPrice } from "@/utils/formatPrice";
import { CustomButton } from "@/components/ProductAddButton";

interface CartClientProps {
  currentUser: SafeUser | any;
}

export default function CartClient({ currentUser }: CartClientProps) {
  const { cartProducts, cartTotalAmout, handleClearCart } = useCart();
  const [selectedOption, setSelectedOption] = useState("checkout");

  const router = useRouter();

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
            small
            outline
            label="Limpar carrinho"
            onClick={handleClearCart}
          />
        </div>

        <div className="text-sm flex flex-col gap-1 items-start">
          <div>
            <div className="py-4 flex gap-1">
              <h1 className="font-semibold">Forma de Pagamento:</h1>
              <select
                name="payway"
                onChange={(event) => setSelectedOption(event.target.value)}
              >
                <option value="checkout">Cartão</option>
                <option value="pix">PIX</option>
              </select>
            </div>

            <div className="flex justify-between w-64 text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotalAmout)}</span>
            </div>
            <p>Frete e Taxas</p>

            {currentUser ? (
              <CustomButton
                outline
                label="Confirmar"
                onClick={() => router.push(`/${selectedOption}`)}
              />
            ) : (
              <CustomButton
                outline={false}
                label="Login para confirmar"
                onClick={() => router.push("/login")}
              />
            )}

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
