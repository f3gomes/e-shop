import React from "react";

import { FormWrap } from "@/components/FormWrap";
import { Container } from "@/components/Container";

import PixCheckoutClient from "./PixCheckoutClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function Checkout() {
  const user = await getCurrentUser();

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <PixCheckoutClient user={user} />
        </FormWrap>
      </Container>
    </div>
  );
}
