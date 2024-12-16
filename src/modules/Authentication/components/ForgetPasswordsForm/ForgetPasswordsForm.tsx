import React from "react";
import { ROUTES } from "constant";

import { Box, Button, Grid, InputLabel, Link, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

type Props = {};

export const ForgetPasswordsForm = (props: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(ROUTES.ENTER_CODE);
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
              Password
            </Box>

            <TextField
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
              onClick={handleNavigate}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};
