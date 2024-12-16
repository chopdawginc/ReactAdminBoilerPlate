import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { COLORS } from 'constant';
import { Controller, useFormContext } from 'react-hook-form';
import { Box } from '@mui/material';

type Props = {
   name: string;
   rows?: number;
   type?: string;
   label?: string;
   disabled?: boolean;
   multiline?: boolean;
   onFocus?: () => any;
   placeholder?: string;
   defaultValue?: string;
   containerStyles?: object;
};

const CustomTextField = (props: Props) => {
   const {
      rows,
      type,
      name,
      label,
      onFocus,
      disabled,
      multiline,
      placeholder,
      defaultValue,
      containerStyles,
   } = props || {};

   const { control } = useFormContext();

   return (
      <Box sx={{ ...containerStyles }}>
         {label && (
            <InputLabel
               sx={{ fontWeight: '700', fontSize: '18px', color: COLORS.gray.main }}
               shrink>
               {label}
            </InputLabel>
         )}
         <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
               <TextField
                  rows={rows ? rows : 2}
                  fullWidth
                  {...field}
                  type={type}
                  variant={'outlined'}
                  sx={{
                     '& .MuiOutlinedInput-root': {
                        background: COLORS.gray.thinner,
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                           border: '1px solid transparent',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                           borderColor: 'transparent',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                           border: `1px solid ${COLORS.primary.main}`,
                           // boxShadow: `0px 0px 0px 4px ${COLORS.primary.lightest}`,
                        },
                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                           border: `1px solid ${COLORS.error.light}`,
                        },
                     },
                  }}
                  disabled={disabled}
                  multiline={multiline}
                  error={Boolean(error)}
                  placeholder={placeholder}
                  helperText={error?.message}
                  onFocus={onFocus && onFocus}
               />
            )}
         />
      </Box>
   );
};

export default CustomTextField;
