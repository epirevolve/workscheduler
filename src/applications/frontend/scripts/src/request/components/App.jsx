import React from 'react';

import Grid from '@material-ui/core/Grid';

import OpenDialog from '../containers/OpenDialog';
import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import DisplayCalendar from '../containers/DisplayCalendar';
import DisplayHolidays from "../containers/DisplayHolidays";
import WaitLoading from 'WaitLoading';

const app = () => (
    <WaitLoading>
        <OpenDialog />
        <ChangeSelectMonth />
        <Grid container>
            <Grid item sm={10}>
                <DisplayCalendar />
            </Grid>
            <Grid item sm={2}>
                <DisplayHolidays />
            </Grid>
        </Grid>
    </WaitLoading>
);

export default app;