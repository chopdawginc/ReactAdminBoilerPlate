import React from "react";
import { IForgetPasswordFormType } from "types";
import {
  AuthLayout,
  EnterCodeForm,
} from "modules/Authentication/components";

type Props = {};

const EnterCodeContainer = (props: Props) => {


  return (
    <AuthLayout>
      <EnterCodeForm

      />
    </AuthLayout>
  );
};

export default EnterCodeContainer;
