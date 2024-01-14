import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

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

export async function GET() {
  return NextResponse.json({ message: "Hello GET!" });
}
