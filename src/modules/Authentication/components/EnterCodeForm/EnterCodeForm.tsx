import React, { useEffect, useState } from "react";
import { ROUTES } from "constant";

import { Box, Button, Grid, InputLabel, Link, TextField, Typography } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useService } from "hooks";
import { QueryType } from "hooks/useService/types";
import { ProfileService } from "services/Profile.Services";
import { useCountdown } from "hooks/useCountdown";
import { useNotification } from "context/NotificationContext";

type Props = {};

export const EnterCodeForm = (props: Props) => {
  const [otp, setOTP] = useState("");

  const { setAlert } = useNotification();

  const { timeLeft, resetCountdown, formattedCountdown, isOtpSent, setIsOtpSent } =
    useCountdown(30);

  const navigate = useNavigate();

  const location = useLocation();

  const { phone } = location.state;

  const sendOTP = useService({
    type: QueryType.MUTATION,
    onRequestService: ProfileService.sendOTP,
    onError: (error) => setAlert({ show: true, message: error.message }),
  });

  const verifyOTP = useService({
    type: QueryType.MUTATION,
    onRequestService: ProfileService.verifyOTP,
    onError: (error) => setAlert({ show: true, message: error.message }),
  });

  useEffect(() => {
    phone && onSendOTP();
  }, [phone]);

  const onSendOTP = async () => {
    // await sendOTP.onRequest({ phone });
    setIsOtpSent(true);
    resetCountdown();
  };

  console.log(sendOTP.data);
  console.log(sendOTP.error);

  const handleVerifyOTP = async () => {
    await verifyOTP.onRequest({ phone, otp });
    navigate(ROUTES.DASHBOARD);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setOTP(value);
    }
  };

  return (
    <React.Fragment>
      <form>
        <Grid mt={5} container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                fontWeight: "600",
                fontSize: "23px",
                color: "white",
                marginBottom: "0px",
                paddingBottom: "0px",
              }}
            >
              Enter Code
            </Box>
            <TextField
              // type="number"
              value={otp}
              variant="outlined"
              fullWidth
              placeholder="000-000"
              onChange={handleInputChange}
              inputProps={{
                maxLength: 6,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",

                "& .MuiInputBase-input::placeholder": {
                  color: "black",
                  opacity: 1,
                },
              }}
            />
          </Grid>

          <Grid mt={3} item xs={12}>
            <Button
              fullWidth
              disabled={otp.length !== 6}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#BDE047",
                borderRadius: "8px",
                color: "black",
                "&:hover": {
                  backgroundColor: "#BDE047",
                },
              }}
              onClick={handleVerifyOTP}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="right" sx={{ color: "white" }}>
            {isOtpSent ? (
              <Typography>{formattedCountdown}</Typography>
            ) : (
              <Typography
                style={{
                  color: "white",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={onSendOTP}
              >
                Resend Code
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};
