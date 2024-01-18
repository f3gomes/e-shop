import React from "react";

import getUsers from "@/actions/getUsers";
import getOrders from "@/actions/getOrders";
import getProducts from "@/actions/getProducts";
import { Container } from "@/components/Container";

import Summary from "./Summary";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";

export default async function AdminPage() {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  const graphData = await getGraphData();

  return (
    <div>
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mt-10 mx-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
}
