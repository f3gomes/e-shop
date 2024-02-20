import React from "react";

import { Container } from "@/components/Container";
import { ProductListRating } from "@/components/ProductListRating";
import ProductDetails from "./productDetails";
import getProductById from "@/actions/getProductById";
import { NullData } from "@/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productId?: string;
}

export default async function Product({ params }: { params: IParams }) {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product) {
    return <NullData title="O Produto com esse ID não existe!" />;
  }

  return (
    <div className="p-8">
      <Container className="-mx-4">
        {product && <ProductDetails product={product} />}

        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          {product && <ProductListRating product={product} />}
        </div>
      </Container>
    </div>
  );
}
