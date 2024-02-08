import { Review } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;

  const deliveredOrder = currentUser?.orders.some((order) =>
    order.products.find(
      (item) => item.id === product.id && order.deliveryStatus === "delivered"
    )
  );

  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === currentUser.id;
  });

  if (userReview) {
    const error = {
      code: 400,
      message: "User has already rated this product.",
    };

    return NextResponse.json(error, {
      status: 400,
    });
  }

  if (!deliveredOrder) {
    const error = {
      code: 400,
      message: "Order has not yet been delivered.",
    };

    return NextResponse.json(error, {
      status: 400,
    });
  }

  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  });

  return NextResponse.json(review);
}
