import ROUTES from "@constants/routes";
import { Dashboard, Login } from "@screens/index";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
]);

export default router;
