import { Container } from "@/components/Container";
import { FormWrap } from "@/components/FormWrap";
import React from "react";
import CheckoutClient from "./CheckoutClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function Checkout() {
  const user = await getCurrentUser()

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckoutClient user={user}/>
        </FormWrap>
      </Container>
    </div>
  );
}
