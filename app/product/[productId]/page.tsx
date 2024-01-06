import { Container } from "@/components/Container";
import React from "react";
import ProductDetails from "./productDetails";
import { products } from "@/utils/data";

interface IParams {
  productId?: string;
}

export default function Produc({ params }: { params: IParams }) {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={products[2]} />
      </Container>
    </div>
  );
}
