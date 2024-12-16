import { AlertColor } from '@mui/material';
import React, { createContext, useState, ReactNode, useContext } from 'react';

type AlertState = {
   show: boolean;
   message: string;
   variant?: AlertColor;
};

type NotificationContextType = {
   setAlert: React.Dispatch<React.SetStateAction<AlertState>>;
   alert: AlertState;
};

export const NotificationContext = createContext<NotificationContextType>({
   setAlert: () => {},
   alert: {
      show: false,
      message: '',
      variant: undefined,
   },
});

type NotificationContextProviderProps = {
   children: ReactNode;
};

export const NotificationContextProvider = ({ children }: NotificationContextProviderProps) => {
   const [alert, setAlert] = useState<AlertState>({
      show: false,
      message: '',
      variant: undefined,
   });

   React.useEffect(() => {
      if (alert.show) {
         setTimeout(() => {
            setAlert({ show: false, message: '', variant: alert.variant });
         }, 3000);
      }
   }, [alert.show, alert.variant]);

   return (
      <NotificationContext.Provider value={{ alert, setAlert }}>
         {children}
      </NotificationContext.Provider>
   );
};

export const useNotification = () => useContext(NotificationContext);
