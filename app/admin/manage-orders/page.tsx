import React from "react";

import { NullData } from "@/components/NullData";
import { Container } from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";

export default async function ManageOrders() {
  const orders = await getOrders()
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Acesso negado!" />;
  }

  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
}
