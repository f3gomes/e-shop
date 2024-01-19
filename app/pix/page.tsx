import React from "react";

import { FormWrap } from "@/components/FormWrap";
import { Container } from "@/components/Container";

import PixCheckoutClient from "./PixCheckoutClient";

export default function Checkout() {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <PixCheckoutClient />
        </FormWrap>
      </Container>
    </div>
  );
}
