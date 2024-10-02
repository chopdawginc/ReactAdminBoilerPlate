import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// import { ILoginFormType } from 'types';
import { ILoginFormSchema } from "schema";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "constant";
import * as yup from "yup";
import { QueryType } from "hooks/useService/types";
import { AuthService } from "services/Auth.Services";
import useService from "hooks/useService";
import { useNotification } from "context/NotificationContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { Admin } from "models/schema";

export const emailSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
});

interface IIdentifyUserFormType {
  email: string;
}

type Props = {};

export const IdentifyUserForm = (props: Props) => {
  const navigate = useNavigate();
  const { setAlert } = useNotification();

  const { register, handleSubmit } = useForm<IIdentifyUserFormType>({
    mode: "onChange",
    resolver: yupResolver(emailSchema),
  });

  const { onRequest, isLoading, data, error } = useService<Admin>({
    type: QueryType.MUTATION,
    onRequestService: AuthService.getUserByEmail,
    onError: (error) => setAlert({ show: true, message: error.message }),
  });

  const formSubmitHandler: SubmitHandler<IIdentifyUserFormType> = async (values) => {
    const res = (await onRequest({ email: values.email })) as Admin;

    if (res.phone) {
      navigate(ROUTES.ENTER_CODE, {
        state: { isUserVerified: true, phone: res.phone },
      });
    }
  };

  return (
    <React.Fragment>
      <form>
        <Grid mt={5} container spacing={2}>
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
              Email
            </Box>

            <TextField
              {...(register && { ...register("email") })}
              type="email"
              variant="outlined"
              fullWidth
              placeholder="Enter your email"
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: "0px",
                "& .MuiInputBase-input::placeholder": {
                  color: "black",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "8px",
                  },
                },
              }}
            />
          </Grid>

          <Grid mt={3} item xs={12}>
            <LoadingButton
              loading={isLoading}
              onClick={handleSubmit(formSubmitHandler)}
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
              Next
            </LoadingButton>
          </Grid>
          <Grid item xs={12} textAlign="right" sx={{ color: "white" }}>
            <Link to={ROUTES.LOGIN} style={styles.link}>
              Login here
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

const styles = {
  link: {
    color: "white",
    textDecoration: "underline",
    fontWeight: "600",
    fontSize: "23px",
  },
};
