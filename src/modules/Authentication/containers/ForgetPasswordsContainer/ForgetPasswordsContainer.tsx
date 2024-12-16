import React from "react";
import { IForgetPasswordFormType } from "types";
import {
  AuthLayout,
  ForgetPasswordsForm,
} from "modules/Authentication/components";

type Props = {};

const ForgetPasswordsContainer = (props: Props) => {
  return (
    <AuthLayout>
      <ForgetPasswordsForm />
    </AuthLayout>
  );
};

export default ForgetPasswordsContainer;
