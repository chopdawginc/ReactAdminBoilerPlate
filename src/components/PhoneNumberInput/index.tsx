import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Typography, InputLabel, Box } from '@mui/material';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import 'styles/_main.css';
import CBox from 'components/CBox';
import { COLORS } from 'constant';

interface PhoneNumberInputProps {
   name: string;
   label: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ name, label }) => {
   const { control } = useFormContext();

   return (
      <Box>
         <InputLabel sx={{ fontWeight: '700', fontSize: '18px', color: COLORS.gray.main }} shrink>
            {label}
         </InputLabel>
         <CBox col gap={0.5} width='100%'>
            <Controller
               name={name}
               control={control}
               rules={{
                  required: 'Phone number is required',
                  validate: (value) => (value ? true : 'Invalid phone number'),
               }}
               render={({ field, fieldState: { error } }) => (
                  <>
                     <PhoneInputWithCountry {...field} defaultCountry='US' />

                     <Typography
                        sx={{
                           fontSize: '12px',
                           fontWeight: '400',
                           color: COLORS.error.light,
                           marginLeft: '15px',
                        }}>
                        {error?.message}
                     </Typography>
                  </>
               )}
            />
         </CBox>
      </Box>
   );
};

export default PhoneNumberInput;
