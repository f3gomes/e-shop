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
import { FormControl, MenuItem, Select } from "@mui/material";

interface CartClientProps {
  currentUser: SafeUser | any;
}

export default function CartClient({ currentUser }: CartClientProps) {
  const { cartProducts, cartTotalAmout, handleClearCart } = useCart();
  const [selectedOption, setSelectedOption] = useState("checkout");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handlePushCheckout = () => {
    setIsLoading(true);
    router.push(`/${selectedOption}`);
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Seu carrinho está vazio</div>

        <div>
          <Link
            href={"/"}
            className="text-shop-text-sub flex items-center gap-1 mt-2"
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
          cartProducts.map((item, index) => {
            return <CartItem key={item.id + index} item={item} />;
          })}
      </div>

      <div className="border-t-[1.5px] py-4 flex justify-between gap-4">
        <div className="w-[140px]">
          <CustomButton
            small
            outline
            label="Limpar carrinho"
            onClick={handleClearCart}
          />
        </div>

        <div className="text-sm flex flex-col gap-2 items-start">
          <div className="py-4 min-w-[274px]">
            <span className="font-semibold text-base">Forma de pagamento</span>
            <FormControl fullWidth>
              <Select
                value={selectedOption}
                onChange={(event) => setSelectedOption(event.target.value)}
              >
                <MenuItem value={"checkout"}>Cartão</MenuItem>
                <MenuItem value={"pix"}>PIX</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmout)}</span>
          </div>

          <div className="flex justify-between w-full text-base">
            <span>Frete e Taxas</span>
            <span>R$ 0,00</span>
          </div>

          {currentUser ? (
            <CustomButton
              disabled={isLoading}
              label={isLoading ? "Aguarde..." : "Confirmar"}
              onClick={handlePushCheckout}
            />
          ) : (
            <CustomButton
              outline
              label="Login para confirmar"
              onClick={() => router.push("/login")}
            />
          )}

          <Link
            href={"/"}
            className="text-shop-text-default flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Continar comprando</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
