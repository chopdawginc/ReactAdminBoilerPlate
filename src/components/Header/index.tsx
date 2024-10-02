import React from 'react';
import CBox from 'components/CBox';
import { Typography } from '@mui/material';
import { useAuthContext } from 'context/AuthContext';

interface HeaderProps {
   title?: string;
}

const Header = ({ title }: HeaderProps) => {
   const { user } = useAuthContext();

   return (
      <CBox jsb>
         <Typography fontSize={'30px'} fontWeight={800}>
            {title}
         </Typography>
         <Typography fontSize={'25px'} fontWeight={600}>
            Welcome, {user?.name}
         </Typography>
      </CBox>
   );
};

export default Header;
