import React, { useState, KeyboardEvent } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { COLORS } from "constant";
import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";

type EditableFieldProps = {
  name: string;
  label: string;
  currency?: string;
  type?: string;
};

const EditableField: React.FC<EditableFieldProps> = ({
  name,
  label,
  type,
  currency,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const { register, getValues } = useFormContext();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <Box display="flex" mt={5} gap={4} alignItems="center">
      <Typography fontSize={16} fontWeight={600} color={COLORS.gray.main}>
        {label}
      </Typography>
      {!isEditing ? (
        <Typography fontSize={16} fontWeight={600} color={COLORS.dark.light}>
          {getValues(name)}
          {currency}
        </Typography>
      ) : (
        <input
          type={type ?? ""}
          autoFocus
          {...register(name)}
          onKeyDown={handleKeyDown}
          style={{ border: "none" }}
          defaultValue={getValues(name)}
          onBlur={() => setIsEditing(false)}
        />
      )}
      <BorderColorOutlinedIcon
        fontSize="small"
        sx={{ cursor: "pointer" }}
        onClick={() => setIsEditing(!isEditing)}
      />
    </Box>
  );
};

export default EditableField;
