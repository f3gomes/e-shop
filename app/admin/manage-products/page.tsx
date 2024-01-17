import React from "react";

import getProducts from "@/actions/getProducts";
import { NullData } from "@/components/NullData";
import { Container } from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";

import ManageProductsClient from "./ManageProductsClient";

export default async function ManageProducts() {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Acesso negado!" />;
  }

  return (
    <div>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
}
