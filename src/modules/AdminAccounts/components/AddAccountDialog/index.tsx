import React, { useState, ChangeEvent, FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { CustomDropdown, CustomTextField, PhoneNumberInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useService } from "hooks";
import { QueryType } from "hooks/useService/types";
import { ProfileService } from "services/Profile.Services";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNotification } from "context/NotificationContext";
import { ClientService } from "services/Client.Services";
import { useDataContext } from "context/DataContext";
import { Admin } from "models/schema";

interface AddAccountDialogProps {
  open: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  accountType: yup.string().required("Account Type is required"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .test("isValidPhoneNumber", "Invalid phone number", (value) => {
      return typeof value == "string" && isValidPhoneNumber(value);
    }),
});
const AddAccountDialog: FC<AddAccountDialogProps> = ({ open, onClose }) => {
  const { getAdmins } = useDataContext();

  const addAdmin = useService<Admin>({
    type: QueryType.MUTATION,
    onRequestService: ClientService.addNewAdmin,
    onError: (error) => setAlert({ show: true, message: error.message }),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      accountType: "",
      email: "",
      fullName: "",
      phoneNumber: "",
    },
  });
  const { handleSubmit } = methods;

  const { setAlert } = useNotification();

  const handleAddAccount = async (data: any) => {
    await addAdmin.onRequest(data);
    methods.reset();
    getAdmins.refetch();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: "8px 8px 24px 8px",
        },
      }}
    >
      <DialogTitle textAlign={"center"}>Add New Account</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleAddAccount)}>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <CustomDropdown
              name="accountType"
              label="Account Type"
              options={[
                { name: "Admin", value: "Admin" },
                { name: "Super Admin", value: "Super Admin" },
              ]}
            />
            <CustomTextField name="fullName" label="Full Name" />
            <CustomTextField name="email" label="Email" />

            <PhoneNumberInput name="phoneNumber" label="Phone Number" />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <LoadingButton
              loading={addAdmin.isLoading}
              disabled={!methods.formState.isValid}
              type="submit"
              variant="contained"
              color="primary"
            >
              Add New Admin
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default AddAccountDialog;
