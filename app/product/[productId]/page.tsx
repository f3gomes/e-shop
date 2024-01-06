import React from "react";

interface IParams {
  productId?: string;
}

export default function Product({ params }: { params: IParams }) {
  console.log(params);
  return <div>Product</div>;
}
