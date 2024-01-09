import React from "react";

import { products } from "@/utils/data";
import { Container } from "@/components/Container";
import { ProductListRating } from "@/components/ProductListRating";

import ProductDetails from "./productDetails";

interface IParams {
  productId?: string;
}

export default function Produc({ params }: { params: IParams }) {
  const product = products.find((item) => item.id === params.productId);

  return (
    <div className="p-8">
      <Container>
        {product && <ProductDetails product={product} />}

        <div className="flex flex-col mt-20 gap-4">
          <div>Avaliar</div>
          <ProductListRating product={product} />
        </div>
      </Container>
    </div>
  );
}
