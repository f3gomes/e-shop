import React from "react";

import getUsers from "@/actions/getUsers";
import getOrders from "@/actions/getOrders";
import getProducts from "@/actions/getProducts";
import { Container } from "@/components/Container";
import Summary from "./Summary";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/components/NullData";

export default async function AdminPage() {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();
  const orders = await getOrders();
  const users = await getUsers();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Acesso negado!" />;
  }

  return (
    <div>
      <Container>
        <Summary products={products} orders={orders} users={users} />
      </Container>
    </div>
  );
}
