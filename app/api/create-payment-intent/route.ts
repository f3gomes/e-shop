import Stripe from "stripe";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/types/cart";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const totalItem = item.price * item.quantity;

    return acc + totalItem;
  }, 0);

  return totalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "brl",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),

        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.error();
      }

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "brl",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }

  return NextResponse.error();
}
