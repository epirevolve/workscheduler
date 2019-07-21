import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import OpenDialog from '../containers/OpenDialog';
import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import DisplayCalendar from '../containers/DisplayCalendar';
import Layout from 'Layout';

import { holidays, paidHolidays } from "../embeddedData";

const app = () => (
    <Layout>
        <OpenDialog />
        <ChangeSelectMonth />
        <Grid container>
            <Grid item sm={10}>
                <DisplayCalendar />
            </Grid>
            <Grid item sm={2}>
                <>
                    <Typography variant="h5">Monthly Holidays</Typography>
                    <Typography variant="body1">{holidays || 0} days</Typography>
                </>
                <Divider />
                <>
                    <Typography variant="h5">Remained Paid Holidays</Typography>
                    <Typography variant="body1">{paidHolidays || 0} days</Typography>
                </>
            </Grid>
        </Grid>
    </Layout>
);

export default app;