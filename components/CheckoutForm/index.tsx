import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { Heading } from "../Heading";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { CustomButton } from "../ProductAddButton";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  user: any;
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

export function CheckoutForm({
  user,
  clientSecret,
  handleSetPaymentSuccess,
}: CheckoutFormProps) {
  const { cartTotalAmout, handleClearCart, handleSetPaymentIntent } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const formattedPrice = formatPrice(cartTotalAmout);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
  }, [stripe]); // eslint-disable-line

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Pagamento confirmado!");

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Pagamento via Cartão" />
      </div>

      <h2 className="font-semibold mb-2">Endereço</h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["BR"],
          defaultValues: {
            name: user.name,
            address: {
              city: user.city,
              country: user.country,
              line1: user.line1,
              line2: user.line2,
              postal_code: user.postal_code,
              state: user.state,
            },
          },
        }}
      />

      <h2 className="font-semibold mt-4 mb-2">Informações de Pagamento</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-4xl font-bold">
        Total: {formattedPrice}
      </div>
      <CustomButton
        type="submit"
        disabled={isLoading || !stripe || !elements}
        label={isLoading ? "Processando..." : "Pagar"}
        onClick={() => { }}
      />
    </form>
  );
}
