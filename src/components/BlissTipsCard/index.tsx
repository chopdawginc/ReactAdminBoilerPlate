import React from "react";
import CBox from "components/CBox";
import { CardMedia, IconButton, Typography } from "@mui/material";

interface Props {
  text: string;
  onDelete: () => void;
}

const BlissTipsCard = ({ text, onDelete }: Props) => {
  const truncatedText = truncateText(text, 100);

  return (
    <CBox
      ac
      jsb
      p={2}
      sx={{
        borderRadius: "24px",
        border: "2px solid #6653D3",
        boxShadow: "0px 4px 30px 0px rgba(28, 29, 66, 0.05)",
      }}
    >
      <Typography variant="h6_medium" sx={{ wordBreak: "break-all" }}>
        {truncatedText}
      </Typography>
      <IconButton onClick={onDelete}>
        <CardMedia
          sx={{ height: 21, width: 21 }}
          image="/assets/icons/close-btn.svg"
        />
      </IconButton>
    </CBox>
  );
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export default BlissTipsCard;
