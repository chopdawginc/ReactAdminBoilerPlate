import React, { FC } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Controller, useFormContext } from "react-hook-form";
import { SvgIcon, Checkbox, FormControlLabel } from "@mui/material";

interface ITextFieldProps {
  name: string;
  label?: string;
}

const CustomCheckbox: FC<ITextFieldProps> = (props) => {
  const { name, label } = props || {};

  const { control } = useFormContext();

  return (
    <React.Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                icon={
                  <SvgIcon
                    component={CheckBoxOutlineBlankIcon}
                    sx={{ fontSize: 35 }}
                  />
                }
                checkedIcon={
                  <SvgIcon component={CheckBoxIcon} sx={{ fontSize: 35 }} />
                }
                {...field}
              />
            }
            label={label}
          />
        )}
      />
    </React.Fragment>
  );
};

export default CustomCheckbox;
