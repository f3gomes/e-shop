import mercadopago from "mercadopago";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/types/cart";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { v4 as uuidv4 } from "uuid";
import { shopInfo } from "@/info/shop";
import { Address, Product } from "@prisma/client";

const newId = uuidv4();

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const totalItem = item.price * item.quantity;

    return acc + totalItem;
  }, 0);

  return totalPrice;
};

const updateProductStock = async (
  products: Product[],
  cart: CartProductType[]
) => {
  for (const product of products) {
    for (const item of cart) {
      if (product.id === item.id) {
        await prisma.product.update({
          where: {
            id: item.id,
          },
          data: {
            grid: {
              updateMany: {
                where: {
                  colorCode: item.grid?.colorCode,
                },

                data: {
                  stock: {
                    decrement: item.quantity,
                  },
                },
              },
            },
          },
        });
      }
    }
  }
};

export async function POST(req: Request) {
  const currentUser: any = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN as string,
  });

  const body = await req.json();

  const { firstName, email, items } = body;

  const total = calculateOrderAmount(items) * 100;

  const addressData: Address = {
    city: currentUser.city,
    country: currentUser.country,
    line1: currentUser.line1,
    line2: currentUser.line2,
    postal_code: currentUser.postal_code,
    state: currentUser.state,
  };

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "brl",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: "pix-" + newId,
    products: items,
    address: addressData,
  };

  const preference = {
    transaction_amount: total,
    description: "Compra na loja " + shopInfo.name,
    payment_method_id: "pix",
    installments: 1,
    payer: {
      email,
      first_name: firstName,
    },
  };

  try {
    const response = await mercadopago.payment.create(preference);
    const status = response.status;

    console.log("status: ", status);

    if (status) {
      const qrCode =
        response.body.point_of_interaction.transaction_data.qr_code;

      await prisma.order.create({
        data: orderData,
      });

      const products = await prisma.product.findMany({});
      await updateProductStock(products, items);

      return NextResponse.json({
        code: qrCode,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.error();
}
