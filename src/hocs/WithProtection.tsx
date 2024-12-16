import { auth } from "libs/firebase/@firebase";
import { ROUTES } from "constant";
import { useAuthContext } from "context/AuthContext";
import React, { ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface WithProtectionProps {
  type: string;
}

const withProtection = <P extends object>(
  Component: ComponentType<P>,
  { type }: WithProtectionProps
) => {
  return (props: P) => {
    const { user } = useAuthContext();
    const location = useLocation();

    // When user navigates from identify user page
    const { isUserVerified } = location.state || {};

    if (type === "login") {
      if (auth.currentUser) {
        return <Navigate to={"/"} />;
      }
    }

    if (type === "otp") {
      if (!isUserVerified) {
        return <Navigate to={"/"} />;
      }
    }

    return <Component {...props} />;
  };
};

export default withProtection;
