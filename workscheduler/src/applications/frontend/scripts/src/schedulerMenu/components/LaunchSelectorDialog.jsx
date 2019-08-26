import React from 'react';
import propTypes from 'prop-types';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { mb3 } from 'margin';

const createGridButton = (handle, val) => (
    <Grid item sm={12} md={3}>
        <Button color="primary" size="large" onClick={handle}>
            {val}
        </Button>
    </Grid>
);

const yearCss = css({
    fontSize: '3rem',
    padding: '0rem 2rem',
    color: 'lightslategray'
});

const launchSelectorDialog = (state, setState, launchScheduler) => (
    <Dialog open={state.openCalendar} onClose={() => setState((prev) => ({ ...prev, openCalendar: false }))}>
        <DialogTitle style={{ textAlign: 'center' }}>
            <IconButton aria-label="back year" css={mb3}
                onClick={() => setState((prev) => ({ ...prev, year: state.year - 1 }))}>
                <ArrowBackIosRoundedIcon />
            </IconButton>
            <span css={yearCss}>{state.year}</span>
            <IconButton aria-label="forward year" css={mb3}
                onClick={() => setState((prev) => ({ ...prev, year: state.year + 1 }))}>
                <ArrowForwardIosRoundedIcon />
            </IconButton>
        </DialogTitle>
        <Box style={{ textAlign: 'center', marginBottom: '10px' }}>
            <Grid container>
                {createGridButton(() => launchScheduler(1), 'Jan')}
                {createGridButton(() => launchScheduler(2), 'Feb')}
                {createGridButton(() => launchScheduler(3), 'Mar')}
                {createGridButton(() => launchScheduler(4), 'Apr')}
                {createGridButton(() => launchScheduler(5), 'May')}
                {createGridButton(() => launchScheduler(6), 'Jun')}
                {createGridButton(() => launchScheduler(7), 'Jul')}
                {createGridButton(() => launchScheduler(8), 'Aug')}
                {createGridButton(() => launchScheduler(9), 'Sep')}
                {createGridButton(() => launchScheduler(10), 'Oct')}
                {createGridButton(() => launchScheduler(11), 'Nov')}
                {createGridButton(() => launchScheduler(12), 'Dec')}
            </Grid>
        </Box>
    </Dialog>
);

launchSelectorDialog.propTypes = {
    state: propTypes.object.isRequired,
    setState: propTypes.func.isRequired,
    launchScheduler: propTypes.func.isRequired
};

export default launchSelectorDialog;