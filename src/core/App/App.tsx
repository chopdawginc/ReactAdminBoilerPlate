import AppRouter from "../Routes/Routes";
import { ThemeProvider } from "@contexts/ThemeContext";
import { AuthContextProvider } from "@contexts/AuthContext";
import SnackbarProvider from "@components/SnackbarProvider/SnackbarProvider";
import { NotificationContextProvider } from "@contexts/NotificationContext";

const App = () => {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <NotificationContextProvider>
          <AppRouter />
          <SnackbarProvider />
        </NotificationContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
