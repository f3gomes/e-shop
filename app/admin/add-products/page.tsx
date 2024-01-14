import React from "react";

import { FormWrap } from "@/components/FormWrap";
import { NullData } from "@/components/NullData";
import { Container } from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";

import AddProductForm from "./AddProductForm";

export default async function AddProducts() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Acesso negado!" />;
  }

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
}
