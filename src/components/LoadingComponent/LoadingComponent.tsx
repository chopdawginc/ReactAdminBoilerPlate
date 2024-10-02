import React from "react";
import { Box } from "@mui/system";
import { COLORS } from "constant";
import { CircularProgress } from "@mui/material";

type Props = {
  height?: number;
  isLogo?: boolean;
  isAuthScreen?: boolean;
};

const LoadingComponent = (props: Props) => {
  const { height, isLogo, isAuthScreen } = props;
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      height={`${[height]}vh`}
      justifyContent={"center"}
    >
      {isLogo ? (
        <>
          <img src="/assets/icons/logo.png" alt="logo" />
          <CircularProgress sx={{ color: COLORS.primary.light, mt: 5 }} />
        </>
      ) : (
        <CircularProgress
          sx={{ color: COLORS.primary.light, mt: isAuthScreen ? 5 : 0 }}
        />
      )}
    </Box>
  );
};

export default LoadingComponent;
