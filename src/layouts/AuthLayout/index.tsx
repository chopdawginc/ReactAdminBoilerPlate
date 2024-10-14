import React from "react";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
  const { children } = props || {};

  return (
    <Box display="flex" position={"relative"}>
      {children}
    </Box>
  );
};

export default AuthLayout;
