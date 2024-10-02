import React from "react";
import { ROUTES } from "constant";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { Login, Dashboard } from "screens";
import ForgetPasswords from "screens/ForgetPasswords/ForgetPasswords";
import EnterCode from "screens/EnterCode/EnterCode";
import Library from "screens/Library/Library";
import ManageUser from "screens/ManageUser/ManageUser";
import BlissTips from "screens/BlissTips/BlissTips";
import Legal from "screens/Legal/Legal";
import AdminAccount from "screens/AdminAccount/AdminAccount";
import { routeWithProtection } from "utils/routeWithProtection";
import SecureRoutes from "hocs/SecureRoutes";
import { useAuthContext } from "context/AuthContext";
import { LinearProgress } from "@mui/material";
import IdentifyUser from "screens/IdentifyUser/Login";
import SetPassword from "screens/SetPassword/ForgetPasswords";

type Props = {};

const Routes = (props: Props) => {
  const { isLoading } = useAuthContext();

  if (isLoading) return <LinearProgress />;

  return (
    <ReactRoutes>
      <Route element={<SecureRoutes />}>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path={ROUTES.DASHBOARD} element={<Dashboard />} /> */}
        <Route path={ROUTES.LIBRARY} element={<Library />} />
        <Route path={ROUTES.MANAGE_USER} element={<ManageUser />} />
        <Route path={ROUTES.BLISS_TIPS} element={<BlissTips />} />
        <Route path={ROUTES.LEGAL} element={<Legal />} />
        <Route path={ROUTES.ADMIN_ACCOUNTS} element={<AdminAccount />} />
      </Route>

      <Route
        path={ROUTES.LOGIN}
        element={routeWithProtection(Login, { type: "login" })}
      />
      <Route path={ROUTES.IDENTIFY_USER} element={<IdentifyUser />} />
      <Route path={ROUTES.FORGOT_PASSWORDS} element={<ForgetPasswords />} />
      <Route path={ROUTES.SET_PASSWORD} element={<SetPassword />} />
      <Route
        path={ROUTES.ENTER_CODE}
        element={routeWithProtection(EnterCode, { type: "otp" })}
      />
    </ReactRoutes>
  );
};

export default Routes;
