import { COLORS } from "@constants/colors";
import { loginSchema } from "@validations/index";
import { AuthAction } from "@actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import useService, { QueryType } from "@hooks/useService";
import { Box, TextField, Grid, Button } from "@mui/material";
import { useNotification } from "@contexts/NotificationContext";

interface ILoginFormType {
  email: string;
  password: string;
}

type Props = {};

export const LoginForm = (props: Props) => {
  const navigate = useNavigate();
  const { setAlert } = useNotification();

  const login = useService({
    type: QueryType.MUTATION,
    onRequestService: AuthAction.login,
    onError: (error) => setAlert({ show: true, message: error.message }),
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ILoginFormType>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const formSubmitHandler: SubmitHandler<ILoginFormType> = async (values) => {
    await login.onRequest(values);
    navigate("/");
  };

  return (
    <Box className="flex justify-center items-center">
      <form>
        <Grid mt={5} container spacing={2} width={"100%"} maxWidth={"500px"}>
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
              defaultValue={"admin@test.com"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-input": {
                    color: COLORS.BLACK.main,
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "gray",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid black",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: `1px solid ${COLORS.PRIMARY.main}`,
                  },
                  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    border: `1px solid ${COLORS.ERROR.light}`,
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
              defaultValue={"Abcd@123"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-input": {
                    color: COLORS.BLACK.main,
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "gray",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid black",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: `1px solid ${COLORS.PRIMARY.main}`,
                  },
                  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    border: `1px solid ${COLORS.ERROR.light}`,
                  },
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
              disabled={!isValid}
              sx={{
                backgroundColor: COLORS.PRIMARY.main,
                borderRadius: "8px",
                color: "black",

                "&:hover": {
                  backgroundColor: COLORS.PRIMARY.light,
                },
              }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="right">
            <Link to={""} style={styles.link}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const styles = {
  link: {
    color: COLORS.BLACK.main,
    textDecoration: "underline",
    fontWeight: "600",
    fontSize: "23px",
  },
};
