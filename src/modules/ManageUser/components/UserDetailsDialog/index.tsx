import { useModal } from "hooks";
import React, { FC } from "react";
import { User } from "models/schema";
import ResetEmailAndPassword from "../ResetEmailAndPassword";
import { Dialog, DialogContent, Button, Typography, Grid } from "@mui/material";

interface UserDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  data: User;
}

enum UpdateType {
  Password = "password",
  Email = "email",
}

const UserDetailsDialog: FC<UserDetailsDialogProps> = ({
  open,
  onClose,
  data,
}) => {
  const modal = useModal();

  const handleClickResetPassword = () => {
    modal.setData({ id: data.id, type: UpdateType.Password });
    modal.toggleModal();
  };

  const handleClickResetEmail = () => {
    modal.setData({ id: data.id, type: UpdateType.Email });
    modal.toggleModal();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth={"lg"}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: "30px 8px 24px 8px",
        },
      }}
    >
      <DialogContent>
        <Grid container spacing={4}>
          {/* Personal Information Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Personal Information</Typography>
            <Typography>
              <strong>Email:</strong> {data?.email}
            </Typography>
            <Typography>
              <strong>Phone:</strong>
              {data?.phone}
            </Typography>
            <Typography>
              <strong>Name:</strong> {data?.name}
            </Typography>

            <Button
              onClick={handleClickResetEmail}
              variant="rounded"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
            >
              Reset Email
            </Button>

            <Button
              onClick={handleClickResetPassword}
              variant="rounded"
              color="primary"
              fullWidth
              style={{ marginTop: "8px" }}
            >
              Reset Password
            </Button>
          </Grid>

          {/* Subscription Information Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Subscription Information</Typography>
            <Typography>
              <strong>Type:</strong> Monthly (Active)
            </Typography>
            <Typography>
              <strong>Registration Date:</strong> Jan 9, 2024
            </Typography>
          </Grid>

          {/* Survey Response Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Survey Response</Typography>
            <Typography>
              <strong>What do you want to get out of BlissTrax?</strong>
            </Typography>
            <Typography>Answer: {data?.profile.desiredOutcome}</Typography>

            <Typography style={{ marginTop: "8px" }}>
              <strong>How committed do you want to be?</strong>
            </Typography>
            <Typography>Answer: {data?.profile.commitment}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <ResetEmailAndPassword
        open={modal.isOpen}
        onClose={modal.toggleModal}
        data={modal.data}
      />
    </Dialog>
  );
};

export default UserDetailsDialog;
