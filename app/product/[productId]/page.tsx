import { Container } from "@/components/Container";
import React from "react";
import ProductDetails from "./productDetails";
import { products } from "@/utils/data";
import { ProductListRating } from "@/components/ProductListRating";

interface IParams {
  productId?: string;
}

export default function Produc({ params }: { params: IParams }) {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={products[2]} />

        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ProductListRating product={products[2]} />
        </div>
      </Container>
    </div>
  );
}
