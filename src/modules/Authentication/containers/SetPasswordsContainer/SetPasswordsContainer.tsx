import React from "react";
import { IForgetPasswordFormType } from "types";
import {
  AuthLayout,
  SetPasswordsForm,
} from "modules/Authentication/components";

type Props = {};

const SetPasswordsContainer = (props: Props) => {
  return (
    <AuthLayout>
      <SetPasswordsForm />
    </AuthLayout>
  );
};

export default SetPasswordsContainer;
