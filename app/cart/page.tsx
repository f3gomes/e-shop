import React from "react";
import CartClient from "./cartClient";
import { Container } from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function Cart() {
  const currentUser = await getCurrentUser();

  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
}
