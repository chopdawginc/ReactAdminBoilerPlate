import React from 'react';
import { auth } from 'libs/firebase/@firebase';
import { ROUTES } from 'constant';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';

const SecureRoutes: React.FC = () => {
   const user = useAuthContext();

   return auth.currentUser ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default SecureRoutes;
