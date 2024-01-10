import React from "react";

import { FormWrap } from "@/components/FormWrap";
import { Container } from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";

import LoginForm from "./LoginForm";

export default async function Login() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
}
