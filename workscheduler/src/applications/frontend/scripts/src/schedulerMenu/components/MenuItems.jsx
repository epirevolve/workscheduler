import React from 'react';
import propTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import MenuCard from 'MenuCard';

import LaunchSelectorDialog from "./LaunchSelectorDialog";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { my4 } from 'margin';

const createCardInGrid = (title, img, href, description, onClick = () => {}) => {
    img = `/statics/img/${img}`;
    return (
        <Grid item xs={12} md={6} lg={3}>
            <MenuCard {...{ title, img, href, description, onClick }} />
        </Grid>
    );
};

const menuItems = ({ team, launchScheduler }) => {
    const year = new Date().getFullYear();
    const [ state, setState ] = React.useState({ openCalendar: false, year });

    const launchSchedulerWrapper = (month) => {
        setState((prev) => ({ ...prev, openCalendar: false }));
        launchScheduler(team, month, state.year);
    };

    return (
        <>
            {LaunchSelectorDialog(state, setState, launchSchedulerWrapper)}
            <Grid container spacing={2} css={my4} style={{ marginLeft: "0.2rem" }}>
                {createCardInGrid("Monthly Setting", "scheduler-monthly-setting.svg",
                    `/scheduler/monthly-setting?team=${team.id}`,
                    "set require number of member each day and prefixed schedule")}
                {createCardInGrid("Basic Setting", "scheduler-basic-setting.svg",
                    `/scheduler/basic-setting?team=${team.id}`,
                    "set work category and witch parameter will be used when making a schedule")}
                {createCardInGrid("Vacations", "vacations.svg",
                    `/scheduler/vacations?team=${team.id}`,
                    "register vacation periods and extra info")}
            </Grid>
            <Grid container spacing={2} css={my4} style={{ marginLeft: "0.2rem" }}>
                {createCardInGrid("Launch", "scheduler-launch.svg",
                    "#", "create schedule of current team and selected month",
                    () => setState((prev) => ({ ...prev, openCalendar: true })))}
                {createCardInGrid("Launch History", "scheduler-launch-history.svg",
                    '/scheduler/launch-histories',
                    "confirm launched history and current working scheduler")}
            </Grid>
        </>
    );
};

menuItems.propTypes = {
    team: propTypes.object.isRequired,
    launchScheduler: propTypes.func.isRequired
};

export default menuItems;