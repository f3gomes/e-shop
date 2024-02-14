import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      city,
      country,
      line1,
      line2,
      postal_code,
      state,
      number,
      comp,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma?.user.create({
      data: {
        name,
        email,
        hashedPassword,
        city,
        country,
        line1,
        line2,
        postal_code,
        state,
        number,
        comp,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello GET!" });
}
