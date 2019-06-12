import React from 'react';

import requestAgent from 'superagent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Button from '@material-ui/core/Button';

import MenuCard from 'MenuCard';

const dataset = document.querySelector('script[src*="scheduler-menu"]').dataset;
const urlMonthly = dataset.urlMonthly;
const urlBasic = dataset.urlBasic;

const createGridButton = (handle, val) => (
    <Grid item sm={12} md={3}>
        <Button color="primary" size="large" onClick={handle}>
            {val}
        </Button>
    </Grid>
);

const createCardInGrid = (title, img, href, description, onClick = () => {}) => {
    img = `/statics/img/${img}`;
    return (
        <Grid item xs={12} md={6} lg={3}>
            <MenuCard {...{title, img, href, description, onClick}} />
        </Grid>
    );
};

const menuItems = ({ team, onLaunchScheduler }) => {
    const year = new Date().getFullYear();
    const [state, setState] = React.useState({ openCalendar: false, year });

    const onLaunchSchedulerWrapper = (month) => {
        setState(prev => ({...prev, openCalendar: false }));
        onLaunchScheduler(team, month, state.year);
    }

    return (
        <>
            <Dialog open={state.openCalendar} onClose={() => setState(prev => ({...prev, openCalendar: false }))}>
                <DialogTitle style={{ textAlign: 'center' }}>
                    <IconButton aria-label="back year" onClick={() => setState(prev => ({...prev, year: state.year - 1}))}>
                        <ArrowBackIosRoundedIcon />
                    </IconButton>
                    <span style={{ fontSize: '2rem', padding: '0 2rem' }}>{state.year}</span>
                    <IconButton aria-label="forward year" onClick={() => setState(prev => ({...prev, year: state.year + 1}))}>
                        <ArrowForwardIosRoundedIcon />
                    </IconButton>
                </DialogTitle>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Grid container>
                        {createGridButton(() => onLaunchSchedulerWrapper(1), 'Jan')}
                        {createGridButton(() => onLaunchSchedulerWrapper(2), 'Feb')}
                        {createGridButton(() => onLaunchSchedulerWrapper(3), 'Mar')}
                        {createGridButton(() => onLaunchSchedulerWrapper(4), 'Apr')}
                        {createGridButton(() => onLaunchSchedulerWrapper(5), 'May')}
                        {createGridButton(() => onLaunchSchedulerWrapper(6), 'Jun')}
                        {createGridButton(() => onLaunchSchedulerWrapper(7), 'Jul')}
                        {createGridButton(() => onLaunchSchedulerWrapper(8), 'Aug')}
                        {createGridButton(() => onLaunchSchedulerWrapper(9), 'Sep')}
                        {createGridButton(() => onLaunchSchedulerWrapper(10), 'Oct')}
                        {createGridButton(() => onLaunchSchedulerWrapper(11), 'Nov')}
                        {createGridButton(() => onLaunchSchedulerWrapper(12), 'Dec')}
                    </Grid>
                </div>
            </Dialog>
            <Grid container spacing={16} className="my-4" style={{ marginLeft: "0.2rem" }}>
                {createCardInGrid("Monthly Setting", "scheduler-monthly-setting.svg",
                    urlMonthly.replace('team_id', team.id),
                    "set require number of member each day and prefixed schedule")}
                {createCardInGrid("Basic Setting", "scheduler-basic-setting.svg",
                    urlBasic.replace('team_id', team.id),
                    "set work category and witch parameter will be used when making a schedule")}
                {createCardInGrid("Yearly Setting", "scheduler-yearly-setting.svg",
                    urlMonthly.replace('team_id', team.id),
                    "set require number of member each day and prefixed schedule")}
                {createCardInGrid("Launch", "scheduler-launch.svg",
                    "#", "create schedule of current team and selected month",
                    () => setState(prev => ({...prev, openCalendar: true })))}
            </Grid>
        </>
    );
}

export default menuItems;