import React from 'react';
import { COLORS } from 'constant';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select, MenuItem, InputLabel, Box } from '@mui/material';

type Option = {
   name: string;
   value: string | any;
};

type Props = {
   name: any;
   label?: string;
   options: Option[];
   disabled?: boolean;
   defaultValue?: string | any;
};

const CustomDropdown = (props: Props) => {
   const { name, label, defaultValue, options, disabled } = props || {};
   const { control } = useFormContext();

   return (
      <Box>
         <InputLabel sx={{ fontWeight: '700', fontSize: '18px', color: COLORS.gray.main }} shrink>
            {label}
         </InputLabel>
         <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field, fieldState: { error } }) => (
               <div style={{ borderRadius: 4 }}>
                  <Select
                     fullWidth
                     {...field}
                     sx={{
                        '& .MuiInput-input': {
                           fontSize: '18px',
                           fontWeight: 600,
                           background: COLORS.gray.thinner,
                           border: !!error
                              ? `1px solid ${COLORS.error.light}`
                              : `1px solid transparent`,
                           '&:focus': {
                              border: `1px solid ${COLORS.primary.main}`,
                              borderRadius: 2,
                              // boxShadow: `0px 0px 0px 4px ${COLORS.primary.light}`,
                           },
                        },
                     }}
                     // When input prop is not used
                     // sx={{
                     //    '& .MuiSelect-outlined': {
                     //       borderRadius: '20px',
                     //       border: !!error
                     //          ? `1px solid ${COLORS.error.light}`
                     //          : `10px solid ${COLORS.gray.light}`,
                     //       '&:focus': {
                     //          border: `20px solid ${COLORS.primary.main}`,
                     //          borderRadius: 2,
                     //          boxShadow: `0px 0px 0px 4px ${COLORS.primary.light}`,
                     //       },
                     //    },
                     // }}
                     // displayEmpty
                     input={<Input disableUnderline />}
                     disabled={disabled}>
                     {options?.map(({ name, value }) => (
                        <MenuItem key={value} value={value}>
                           {name}
                        </MenuItem>
                     ))}
                  </Select>
                  <p
                     style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        margin: '5px 0px 0px 10px',
                        // marginLeft: '10px',
                        color: COLORS.error.light,
                     }}>
                     {error?.message}
                  </p>
               </div>
            )}
         />
      </Box>
   );
};

export default CustomDropdown;
