import React, { useState, ChangeEvent, FC } from "react";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { CustomDropdown, CustomTextField, PhoneNumberInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { QueryType } from "hooks/useService/types";
import { ProfileService } from "services/Profile.Services";
import LoadingButton from "@mui/lab/LoadingButton";
import useService from "hooks/useService";

interface ResetEmailAndPasswordProps {
  open: boolean;
  onClose: () => void;
  data: { id: string; type: string };
}

const schema = yup.object().shape({
  accountType: yup.string().required("Account Type is required"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup.string().required("Email is required").email("Email must be a valid email address"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .test("isValidPhoneNumber", "Invalid phone number", (value) => {
      return typeof value == "string" && isValidPhoneNumber(value);
    }),
});
const ResetEmailAndPassword: FC<ResetEmailAndPasswordProps> = ({ open, onClose, data }) => {
  const updatePassword = useService({
    type: QueryType.MUTATION,
    onRequestService: ProfileService.updateUserPassword,
  });

  const updateEmail = useService({
    type: QueryType.MUTATION,
    onRequestService: ProfileService.updateUserEmail,
  });

  const methods = useForm({
    // resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  enum UpdateType {
    Password = "password",
    Email = "email",
  }

  const handleResetEmailAndPassword = async (values: { email?: string; password?: string }) => {
    const updateFns: Record<UpdateType, (params: any) => Promise<unknown>> = {
      [UpdateType.Email]: updateEmail.onRequest,
      [UpdateType.Password]: updatePassword.onRequest,
    };

    const updateType = data.type as UpdateType;

    const updateFn = updateFns[updateType];

    const params = {
      userId: data.id,
      ...(updateType === UpdateType.Email
        ? { newEmail: values.email }
        : { newPassword: values.password }),
    };

    await updateFn(params);
    methods.reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: "16px 8px 16px 8px",
        },
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleResetEmailAndPassword)}>
          <DialogContent>
            <CustomTextField
              type={data?.type == "password" ? "password" : "text"}
              name={data?.type}
              label={data?.type == "email" ? "Enter New Email" : "Enter New Password"}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <LoadingButton
              loading={updateEmail.isLoading || updatePassword.isLoading}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "50%" }}
            >
              Update
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default ResetEmailAndPassword;
