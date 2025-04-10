import { Button, Grid, Typography } from '@mui/material';
import { TextEditor } from 'components';
import React, { useState } from 'react';
import LegalContents from '../LegalContents';
import WavelengthContents from '../WavelengthContents';

const LegalData = () => {
   const [view, setView] = useState<string>('legal');

   return (
      <React.Fragment>
         <Grid item xs={12} display={'flex'} gap={2} mb={5}>
            <Button
               sx={{ width: '200px' }}
               onClick={() => setView('legal')}
               variant={view === 'legal' ? 'contained' : 'outlined'}>
               Legal
            </Button>
            <Button
               sx={{ width: '200px' }}
               onClick={() => setView('wavelength')}
               variant={view === 'wavelength' ? 'contained' : 'outlined'}>
               Wavelength
            </Button>
         </Grid>
         {view === 'legal' && <LegalContents />}
         {view === 'wavelength' && <WavelengthContents />}
      </React.Fragment>
   );
};

export default LegalData;
