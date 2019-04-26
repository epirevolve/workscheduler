import React from 'react';

import Grid from '@material-ui/core/Grid';

import WorkCategory from './WorkCategory';

const workCategoryList = ({ workCategories, ...other }) => {
    return workCategories.map(x =>
        <Grid item xs={12} sm={4} key={x.id} className="mr-4 mb-2">
            <WorkCategory workCategory={x} {...other} />
        </Grid>
    );
};

export default workCategoryList;