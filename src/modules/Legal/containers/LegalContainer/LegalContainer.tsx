import React from 'react';
import { Box, Grid } from '@mui/material';
import { AppLayout } from 'layout';
import { LegalData } from 'modules/Legal/components';

type Props = {};

const LegalContainer = (props: Props) => {
   return (
      <AppLayout title='App Content'>
         <Grid container columns={12} overflow={'auto'} height={'100%'}>
            <LegalData />
         </Grid>
      </AppLayout>
   );
};

export default LegalContainer;
