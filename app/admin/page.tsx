import React from "react";

import getUsers from "@/actions/getUsers";
import getOrders from "@/actions/getOrders";
import getProducts from "@/actions/getProducts";
import { Container } from "@/components/Container";

import Summary from "./Summary";

export default async function AdminPage() {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  return (
    <div>
      <Container>
        <Summary products={products} orders={orders} users={users} />
      </Container>
    </div>
  );
}
