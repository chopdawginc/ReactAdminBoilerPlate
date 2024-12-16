import React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import loginbgImage from "../../../../blisstrax_assets/loginBg.png";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = (props: Props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <Box
        width="100%"
        display="flex"
        minHeight="100vh"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        position="relative"
        sx={{
          background: `linear-gradient(to top, transparent 100%, white 100%), url(${loginbgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          component="img"
          src="assets/icons/blisstrax.png"
          alt="logo"
          sx={{
            position: "absolute",
            top: 50,
            width: "100px",
            height: "auto",
          }}
        />
        <Container
          sx={{
            width: { md: "30%", sm: "60%", xs: "90%" },
          }}
        >
          {children}
        </Container>
      </Box>
    </React.Fragment>
  );
};
