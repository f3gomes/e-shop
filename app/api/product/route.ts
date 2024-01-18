import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "../../../libs/prismadb";

export async function GET() {
  return NextResponse.json({ message: "Hello GET!" });
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { name, description, price, brand, category, grid } = body;

    const product = await prisma?.product.create({
      data: {
        name,
        description,
        brand,
        category,
        grid,
        price: parseFloat(price),
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, name, price, grid } = body;

  let product = null;

  if (name && price) {
    product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        price: price,
      },
    });

    return NextResponse.json(product);
  }

  if (grid) {
    product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        grid: grid,
      },
    });

    return NextResponse.json(product);
  }

  return NextResponse.error();
}
