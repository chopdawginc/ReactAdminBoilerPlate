import { app } from "@libs/index";
import theme from "@styles/theme";
import router from "../Routes/Routes";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import SnackbarProvider from "@components/SnackbarProvider";
import { AuthContextProvider } from "@contexts/AuthContext";
import { NotificationContextProvider } from "@contexts/NotificationContext";

const App = () => {
  const invokeFirebaseApp = app;

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <NotificationContextProvider>
          <RouterProvider router={router} />
          <SnackbarProvider />
        </NotificationContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
