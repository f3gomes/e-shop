import prismadb from "@/libs/prismadb";

export default async function getOrders() {
  try {
    const orders = await prismadb.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });

    return orders;

  } catch (error: any) {
    throw new Error(error);
  }
}
