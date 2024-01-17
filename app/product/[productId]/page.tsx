import React from "react";

import { Container } from "@/components/Container";
import { ProductListRating } from "@/components/ProductListRating";
import ProductDetails from "./productDetails";
import getProductById from "@/actions/getProductById";
import { NullData } from "@/components/NullData";

interface IParams {
  productId?: string;
}

export default async function Product({ params }: { params: IParams }) {
  const product = await getProductById(params);

  if (!product) {
    return <NullData title="O Produto com esse ID não existe!" />;
  }

  return (
    <div className="p-8">
      <Container>
        {product && <ProductDetails product={product} />}

        <div className="flex flex-col mt-20 gap-4">
          <div>Avaliar</div>
          {product && <ProductListRating product={product} />}
        </div>
      </Container>
    </div>
  );
}
