import React from 'react';

import Grid from '@material-ui/core/Grid';

import Vacation from './Vacation';

const vacationList = ({ vacations, ...other }) => (
	vacations.map(x =>
        <Grid item xs={12} sm={3} key={x.id} className="mr-4 mb-2">
            <Vacation vacation={x} {...other} />
        </Grid>
    )
);

export default vacationList;