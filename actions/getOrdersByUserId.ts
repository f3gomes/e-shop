import prismadb from "@/libs/prismadb";

export default async function getOrdersByUserId(userId: string) {
  try {
    const orders = await prismadb.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
      where: {
        userId: userId,
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
