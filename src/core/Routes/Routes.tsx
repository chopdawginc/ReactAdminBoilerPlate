import ROUTES from "@constants/routes";
import SecureRoutes from "@hocs/SecureRoutes";
import { Dashboard, Login } from "@screens/index";
import { useAuthContext } from "@contexts/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppRouter = () => {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SecureRoutes />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: ROUTES.LOGIN,
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
