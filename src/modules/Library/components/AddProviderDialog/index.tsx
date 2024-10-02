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
import { LibraryService } from "services/Library.Services";
import { useAuthContext } from "context/AuthContext";

interface AddProviderProps {
  open: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  providerName: yup.string().required("Provider name is required"),
});

const AddProvider: FC<AddProviderProps> = ({ open, onClose }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      providerName: "",
    },
  });
  const { handleSubmit } = methods;

  const { user } = useAuthContext();

  const addProvider = useService({
    type: QueryType.MUTATION,
    onRequestService: LibraryService.addProvider,
  });

  const handleAddProvider = async (data: any) => {
    await addProvider.onRequest({ userId: user?.id, ...data });
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
        <form onSubmit={handleSubmit(handleAddProvider)}>
          <DialogContent>
            <CustomTextField name="providerName" label="Enter Provider Name" />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              disabled={addProvider.isLoading}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "50%" }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default AddProvider;
