import React, { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useNotification } from 'context/NotificationContext';

const SnackbarProvider: React.FC = () => {
   const { alert, setAlert } = useNotification();

   return (
      <Snackbar open={alert.show} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
         {
            <Alert
               variant='filled'
               sx={{ width: '100%' }}
               severity={alert.variant || 'error'}
               onClose={() => setAlert({ show: false, message: '', variant: alert.variant })}>
               {alert.message}
            </Alert>
         }
      </Snackbar>
   );
};

export default SnackbarProvider;
