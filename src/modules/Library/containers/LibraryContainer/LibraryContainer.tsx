import React from 'react';
import { Box, Grid } from '@mui/material';
import { AppLayout } from 'layout';
import { LibraryData } from 'modules/Library/components';
import { CBox } from 'components';

type Props = {};

const LibraryContainer = (props: Props) => {
   return (
      <AppLayout title='Library'>
         <CBox col height={'100%'} gap={5}>
            <LibraryData />
         </CBox>
      </AppLayout>
   );
};

export default LibraryContainer;
