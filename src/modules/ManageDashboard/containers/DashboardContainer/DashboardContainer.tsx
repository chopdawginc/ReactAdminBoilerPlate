import React from 'react';
import { Box, Grid } from '@mui/material';
import { AppLayout } from 'layout';
import { DashboardData } from 'modules/ManageDashboard/components';
import { CBox } from 'components';

type Props = {};

const DashboardContainer = (props: Props) => {
   return (
      <AppLayout title='Dashboard' fullWidth>
         <CBox col height={'100%'}>
            <DashboardData />
         </CBox>
      </AppLayout>
   );
};

export default DashboardContainer;
