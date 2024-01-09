import { Container } from "@/components/Container";
import { FormWrap } from "@/components/FormWrap";
import React from "react";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  );
}
