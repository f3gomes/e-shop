import React from "react";
import CartClient from "./cartClient";
import { Container } from "@/components/Container";

export default function Cart() {
  return (
    <div className="pt-8">
      <Container>
        <CartClient />
      </Container>
    </div>
  );
}
