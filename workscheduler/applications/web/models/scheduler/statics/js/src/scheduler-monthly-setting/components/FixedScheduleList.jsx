import React from 'react';

import Grid from '@material-ui/core/Grid';

import FixedSchedule from './FixedSchedule';

const fixedScheduleList = ({ fixedSchedules, ...other }) => {
    return fixedSchedules.map(x =>
        <Grid item xs={12} sm={3} key={x.id} className="mr-4 mb-2">
            <FixedSchedule fixedSchedule={x} {...other} />
        </Grid>
    );
};
    
export default fixedScheduleList;