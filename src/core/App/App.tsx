import React from "react";
import theme from "styles/theme";
import { Routes } from "core";
import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "components";
// import { AuthContextProvider } from "context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { NotificationContextProvider } from "context/notificationContext";
import "./../../styles/_main.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NotificationContextProvider } from "context/NotificationContext";
import { AuthContextProvider } from "context/AuthContext";
import { DataProvider } from "context/DataContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <DataProvider>
              <NotificationContextProvider>
                <Routes />
                <SnackbarProvider />
              </NotificationContextProvider>
            </DataProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default App;
