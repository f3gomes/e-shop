import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, deliveryStatus, paymentStatus } = body;

  let order = null;

  if (deliveryStatus) {
    order = await prisma.order.update({
      where: { id },
      data: {
        deliveryStatus,
      },
    });
  } else if (paymentStatus) {
    order = await prisma.order.update({
      where: { id },
      data: {
        status: paymentStatus,
      },
    });
  }

  return NextResponse.json(order);
}
