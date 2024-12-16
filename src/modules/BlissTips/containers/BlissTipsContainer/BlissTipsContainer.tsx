import { AppLayout } from 'layout';
import { Grid } from '@mui/material';
import { BlissTipsData } from 'modules/BlissTips/components';

type Props = {};

const BlissTipsContainer = (props: Props) => {
    return (
        <AppLayout title='Bliss Tips'>
            <Grid
                container
                columns={9}
                spacing={4}
                height={'100%'}
                overflow={'auto'}>
                <BlissTipsData />
            </Grid>
        </AppLayout>
    );
};

export default BlissTipsContainer;
