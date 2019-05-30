import React from 'react'

import Grid from '@material-ui/core/Grid';

import DialogContainer from '../containers/DialogContainer'
import RequestsContainer from '../containers/RequestsContainer'

const dataset = document.querySelector('script[src*="request-public"]').dataset;
const holidays = JSON.parse(dataset.holidays);
const paidHolidays = JSON.parse(dataset.paidHolidays || 0);

const app = () => (
    <>
        <DialogContainer />
        <Grid container>
            <Grid item sm={10}>
                <RequestsContainer />
            </Grid>
            <Grid item sm={2}>
                <div>
                    <h5>Monthly Holidays</h5>
                    <p>{holidays || 0} days</p>
                </div>
                <hr />
                <div>
                    <h5>Remained Paid Holidays</h5>
                    <p>{paidHolidays || 0} days</p>
                </div>
            </Grid>
        </Grid>
    </>
)

export default app;