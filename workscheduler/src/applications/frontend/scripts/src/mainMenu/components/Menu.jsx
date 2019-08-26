import React from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

import MenuCard from 'MenuCard';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { my4 } from "margin";

import { currentOperator } from "../embeddedData";

const createCardInGrid = (title, img, href, description) => {
    img = `/statics/img/${img}`;
    return (
        <Grid item xs={12} md={6} lg={3}>
            <MenuCard {...{ title, img, href, description }} />
        </Grid>
    );
};

const currentUser = currentOperator.user;
const authRole = currentUser.role ? currentUser.role._value_ : -1;

const menu = () => (
    <Box css={my4}>
        <Grid container spacing={2}>
            {createCardInGrid("Schedule", "schedule.svg", '/schedule', "your work schedule and ask change some days")}
            {authRole == 3 && (
                <>
                    {createCardInGrid("Requests", "request.svg", '/scheduler/requests', "request days you wanna get rest")}
                    {createCardInGrid("As Operator", "operator.svg", `/operator/myself/${currentOperator.id}`, "appeal what you can do by registering skill")}
                </>
            )}
            {createCardInGrid("As User", "user.svg", `/user/myself/${currentUser.id}`, "reset your password")}
        </Grid>
        {authRole == 2 && (
            <>
                <Box css={css(my4)}>
                    <Divider />
                </Box>
                <Grid container spacing={2}>
                    {createCardInGrid("Scheduler", "scheduler-menu.svg", '/scheduler/menu', "scheduler option and start to build")}
                    {createCardInGrid("Operators", "operators.svg", '/operator/operators', "what they can do")}
                    {createCardInGrid("Users", "users.svg", '/user/users', "start new user story from here")}
                    {createCardInGrid("Teams", "teams.svg", '/user/teams', "manage teams")}
                    {createCardInGrid("Skills", "skills.svg", '/operator/skills', "what you demand to operator")}
                </Grid>
            </>
        )}
    </Box>
);

export default menu;