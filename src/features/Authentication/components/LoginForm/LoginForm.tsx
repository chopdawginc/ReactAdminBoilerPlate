import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// import { ILoginFormType } from 'types';
import { ILoginFormSchema } from 'schema';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'constant';
import * as yup from 'yup';
import { QueryType } from 'hooks/useService/types';
import { AuthService } from 'services/Auth.Services';
import useService from 'hooks/useService';
import { useNotification } from 'context/NotificationContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuthContext } from 'context/AuthContext';

export const loginSchema = yup.object().shape({
   email: yup.string().required('Email is required'),
   password: yup.string().required('Password is required'),
});

interface ILoginFormType {
   email: string;
   password: string;
}

type Props = {};

export const LoginForm = (props: Props) => {
   const navigate = useNavigate();
   const { setAlert } = useNotification();

   const { register, handleSubmit } = useForm<ILoginFormType>({
      mode: 'onChange',
      resolver: yupResolver(loginSchema),
   });

   const { onRequest, isLoading, error } = useService({
      type: QueryType.MUTATION,
      onRequestService: AuthService.login,
      onError: (error) => setAlert({ show: true, message: error.message }),
   });

   const formSubmitHandler: SubmitHandler<ILoginFormType> = async (values) => {
      await onRequest({ email: values.email, password: values.password });
   };

   const { userLoading } = useAuthContext();

   if (userLoading) {
      return <h1>Loading...</h1>;
   }

   return (
      <React.Fragment>
         <form>
            <Grid mt={5} container spacing={2}>
               <Grid item xs={12}>
                  <Box
                     sx={{
                        fontWeight: '600',
                        fontSize: '23px',
                        color: 'white',
                        marginBottom: '0px',
                        paddingBottom: '0px',
                     }}>
                     Email
                  </Box>

                  <TextField
                     {...(register && { ...register('email') })}
                     type='email'
                     variant='outlined'
                     fullWidth
                     placeholder='Email'
                     sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        marginTop: '0px',
                        '& .MuiInputBase-input::placeholder': {
                           color: 'black',
                           opacity: 1,
                        },
                        '& .MuiOutlinedInput-root': {
                           '& fieldset': {
                              borderRadius: '8px',
                           },
                        },
                     }}
                  />
               </Grid>

               <Grid item xs={12}>
                  <Box
                     sx={{
                        fontWeight: '600',
                        fontSize: '23px',
                        color: 'white',
                        marginBottom: '0px',
                        paddingBottom: '0px',
                     }}>
                     Password
                  </Box>

                  <TextField
                     {...(register && { ...register('password') })}
                     type='password'
                     variant='outlined'
                     fullWidth
                     placeholder='Password'
                     sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',

                        '& .MuiInputBase-input::placeholder': {
                           color: 'black',
                           opacity: 1,
                        },
                        // '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        //   border: "2px solid #87C9E9",
                        //   boxShadow: "0px 0px 0px 4px #97CAD84D",
                        // },
                     }}
                  />
               </Grid>

               <Grid mt={3} item xs={12}>
                  <LoadingButton
                     loading={isLoading}
                     onClick={handleSubmit(formSubmitHandler)}
                     fullWidth
                     variant='contained'
                     color='primary'
                     type='submit'
                     sx={{
                        backgroundColor: '#BDE047',
                        borderRadius: '8px',
                        color: 'black',

                        '&:hover': {
                           backgroundColor: '#BDE047',
                        },
                     }}>
                     Sign In
                  </LoadingButton>
               </Grid>
               <Grid item xs={12} textAlign='right' sx={{ color: 'white' }}>
                  <Link to={ROUTES.IDENTIFY_USER} style={styles.link}>
                     Forgot password?
                  </Link>
               </Grid>
            </Grid>
         </form>
      </React.Fragment>
   );
};

const styles = {
   link: {
      color: 'white',
      textDecoration: 'underline', // Only one textDecoration property
      fontWeight: '600',
      fontSize: '23px',
   },
};
