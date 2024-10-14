import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, TextField, Grid, Button } from "@mui/material";
import { useNotification } from "@contexts/NotificationContext";
import { loginSchema } from "@validations/index";

interface ILoginFormType {
  email: string;
  password: string;
}

type Props = {};

export const LoginForm = (props: Props) => {
  const navigate = useNavigate();
  const { setAlert } = useNotification();

  const { register, handleSubmit } = useForm<ILoginFormType>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const formSubmitHandler: SubmitHandler<ILoginFormType> = async (values) => {
    console.log(values);
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
              placeholder="Email"
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
              {...(register && { ...register("password") })}
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

          <Grid mt={3} item xs={12}>
            <Button
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
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="right" sx={{ color: "white" }}>
            <Link to={""} style={styles.link}>
              Forgot password?
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
