import React, { useEffect } from "react";
import { ERRORS, ROUTES } from "constant";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useService } from "hooks";
import { QueryType } from "hooks/useService/types";
import { ProfileService } from "services/Profile.Services";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { Admin } from "models/schema";

type Props = {};

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .min(6, "Confirm Password must be at least 6 characters")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export const SetPasswordsForm = (props: Props) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { handleSubmit } = methods;

  const navigate = useNavigate();

  const [queryParameters] = useSearchParams();

  const uid = queryParameters.get("uid");

  const verifyUID = useService<Admin>({
    type: QueryType.MUTATION,
    onRequestService: ProfileService.verifyUID,
  });

  const adminSetPassword = useService({
    type: QueryType.MUTATION,
    onRequestService: ProfileService.adminSetPassword,
  });

  useEffect(() => {
    const runVerifyUID = async () => {
      const res = await verifyUID.onRequest({ uid });
    };
    uid && runVerifyUID();
  }, [uid]);

  if (!uid) {
    return <Typography variant="h4">{ERRORS.UNKNOWN_ERROR.message}</Typography>;
  }

  if (verifyUID.error) {
    return <Typography variant="h4">{verifyUID.error.message}</Typography>;
  }

  if (verifyUID.isLoading) {
    return <LinearProgress />;
  }

  const handleUpdatePassword = async (values: any) => {
    await adminSetPassword.onRequest({
      userId: uid,
      newPassword: values.password,
    });
    navigate(ROUTES.LOGIN);
  };

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleUpdatePassword)}>
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
                Password
              </Box>

              <TextField
                {...methods.register("password")}
                type="password"
                variant="outlined"
                fullWidth
                placeholder="Password"
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
                Re-Enter Password
              </Box>

              <TextField
                {...methods.register("confirmPassword")}
                name={"confirmPassword"}
                type="password"
                variant="outlined"
                fullWidth
                placeholder="Confirm Password"
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
                disabled={!methods.formState.isValid || adminSetPassword.isLoading}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  backgroundColor: "#BDE047",
                  borderRadius: "8px",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#BDE047",
                  },
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </React.Fragment>
  );
};
