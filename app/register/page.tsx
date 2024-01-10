import React from "react";

import { FormWrap } from "@/components/FormWrap";
import { Container } from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";

import RegisterForm from "./RegisterForm";

export default async function Register() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
}
