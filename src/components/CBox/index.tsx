import React, { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";

interface CBoxProps extends BoxProps {
  col?: boolean;
  ac?: boolean;
  ae?: boolean;
  as?: boolean;
  jc?: boolean;
  je?: boolean;
  jsb?: boolean;
  jse?: boolean;
  wrp?: boolean;
  gap?: number;
  children?: ReactNode;
}

const CBox = ({
  col,
  ac,
  ae,
  as,
  jc,
  je,
  jsb,
  jse,
  wrp,
  gap = 2,
  children,
  ...rest
}: CBoxProps) => {
  const alignItems = as ? "flex-start" : ac ? "center" : ae ? "flex-end" : undefined;
  const justifyContent = jsb
    ? "space-between"
    : jse
    ? "space-evenly"
    : je
    ? "flex-end"
    : jc
    ? "center"
    : undefined;

  return (
    <Box
      display="flex"
      flexDirection={col ? "column" : "row"}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexWrap={wrp ? "wrap" : "nowrap"}
      gap={gap}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default CBox;
