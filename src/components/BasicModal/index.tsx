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
  Typography,
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

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  btnRightClick: () => void;
  description: string;
  heading: string;
  btnLeftText: string;
  btnRightText: string;
  isConfirm?: boolean;
  loading?: boolean;
}

const BasicModal: FC<BasicModalProps> = ({
  open,
  onClose,
  description,
  heading,
  btnLeftText,
  btnRightText,
  btnRightClick,
  isConfirm,
  loading,
}) => {
  const { setAlert } = useNotification();

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
      <DialogTitle textAlign={"center"}>{heading}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">{description}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          onClick={onClose}
        >
          {btnLeftText}
        </LoadingButton>
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
          onClick={btnRightClick}
        >
          {btnRightText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default BasicModal;
