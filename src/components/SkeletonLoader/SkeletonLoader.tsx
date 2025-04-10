import React from "react";
import { Box, Skeleton } from "@mui/material";

type Props = {
  width: string;
  height: string;
};
const SkeletonLoader = (props: Props) => {
  const { width, height } = props;
  return (
    <Box>
      <Skeleton variant="rectangular" width={width} height={height} />
    </Box>
  );
};

export default SkeletonLoader;
