import React from "react";

import { NullData } from "@/components/NullData";
import getOrderById from "@/actions/getOrderById";
import { Container } from "@/components/Container";
import OrderDetails from "./OrderDetails";

interface IParams {
  orderId?: string;
}

export default async function Order({ params }: { params: IParams }) {
  const order = await getOrderById(params);

  if (!order) {
    return <NullData title="Sem pedidos" />;
  }

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
}
