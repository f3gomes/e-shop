"use client";

import React, { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { CustomButton } from "@/components/CustomButton";
import { PiSealCheckBold } from "react-icons/pi";
import QRCode from "@/components/QrCode";
import { formatPrice } from "@/utils/formatPrice";

interface PixCheckoutClientProps {
  user: any;
}

export default function PixCheckoutClient({ user }: PixCheckoutClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutCreated, setCheckoutCreated] = useState(false);
  const [qrCode, setQRCode] = useState("");

  const router = useRouter();

  const { cartProducts, cartTotalAmout, handleClearCart } = useCart();

  const handleSubmit = async () => {
    setIsLoading(true);

    const data = {
      email: user.email,
      firstName: user.name,
      items: cartProducts,
    };

    try {
      const response = await axios.post("/api/mercado-pago", data);
      const code = response.data.code;

      if (code) {
        setQRCode(code);
        setCheckoutCreated(true);
        handleClearCart();
      }
    } catch (error) {
      console.log(error);
      toast("Algo deu errado!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <Heading title="Pagamento via PIX" />

      {!checkoutCreated ? (
        <div className="flex flex-col items-center gap-3">
          <CustomButton
            onClick={handleSubmit}
            disabled={isLoading}
            label={isLoading ? "Gerando..." : "Gerar QR Code"}
          />

          <div className="font-semibold">
            Valor: {formatPrice(cartTotalAmout)}
          </div>
          <div className="flex items-center gap-1">
            <p className="text-sm">Pagamento através do Mercado Pago</p>
            <PiSealCheckBold className="text-blue-600" />
          </div>
        </div>
      ) : (
        <>
          <QRCode isLoading={isLoading} code={qrCode} />

          <div className="max-w-[220px] w-full">
            <CustomButton
              label="Meus Pedidos"
              onClick={() => router.push("/orders")}
            />
          </div>
        </>
      )}
    </div>
  );
}
