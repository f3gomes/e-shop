"use client";

import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/CheckoutForm";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { CustomButton } from "@/components/ProductAddButton";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutClient() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();

  const router = useRouter();

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log("Error: ", error);
          toast.error("Algo deu errado!");
        });
    }
  }, []); // eslint-disable-line

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Carregando...</div>}
      {error && (
        <div className="text-center text-rose-500">Algo deu errado!</div>
      )}

      {paymentSuccess && (
        <div className="flex flex-col items-center gap-3">
          <div className="text-teal-500 text-center">Pagamento confirmado!</div>
          <div className="max-w-[220px] w-full">
            <CustomButton
              label="Meus Pedidos"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
