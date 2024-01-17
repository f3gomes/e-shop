import React from "react";

import { NullData } from "@/components/NullData";
import { Container } from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import OrdersClient from "./OrdersClient";

export default async function Orders() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Acesso negado!" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="Sem pedidos" />;
  }

  return (
    <div>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
}
