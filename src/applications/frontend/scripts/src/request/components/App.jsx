import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import OpenDialog from '../containers/OpenDialog';
import RequestsContainer from '../containers/RequestsContainer';
import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import Layout from 'Layout';

import { holidays, paidHolidays } from "../embeddedData";

const app = () => (
    <Layout>
        <OpenDialog />
        <ChangeSelectMonth />
        <Grid container>
            <Grid item sm={10}>
                <RequestsContainer />
            </Grid>
            <Grid item sm={2}>
                <>
                    <Typography variant="h5">Monthly Holidays</Typography>
                    <p>{holidays || 0} days</p>
                </>
                <hr />
                <div>
                    <h5>Remained Paid Holidays</h5>
                    <p>{paidHolidays || 0} days</p>
                </div>
            </Grid>
        </Grid>
    </Layout>
);

export default app;