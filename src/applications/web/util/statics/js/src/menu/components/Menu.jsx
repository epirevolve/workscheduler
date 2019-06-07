import React from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import MenuCard from 'MenuCard';

const dataset = document.querySelector('script[src*="main-menu"]').dataset;
const urlSchedules = dataset.urlSchedules;
const urlRequests = dataset.urlRequests;
const urlAsOperator = dataset.urlAsOperator;
const urlAsUser = dataset.urlAsUser;
const urlSchedulerMenu = dataset.urlSchedulerMenu;
const urlOperators = dataset.urlOperators;
const urlUsers = dataset.urlUsers;
const urlMainTeams = dataset.urlAffiliations;
const urlSkills = dataset.urlSkills;
const urlSubTeams = dataset.urlTeams;
const auth = JSON.parse(dataset.auth);

const menu = () => {
    const createCardInGrid = (title, img, href, description) => {
        img = `/statics/img/${img}`;
        return (
            <Grid item xs={12} md={6} lg={3}>
                <MenuCard {...{title, img, href, description}} />
            </Grid>
        );
    };

    return (
        <>
            <Grid container spacing={16} className="my-4">
                {createCardInGrid("Schedule", "schedule.svg", urlSchedules, "your work schedule and ask change some days")}
                {auth.isOperator && (
                    <>
                        {createCardInGrid("Requests", "request.svg", urlRequests, "request days you wanna get rest")}
                        {createCardInGrid("As Operator", "operator.svg", urlAsOperator, "appeal what you can do by registering skill")}
                    </>
                )}
                {createCardInGrid("As User", "user.svg", urlAsUser, "reset your password")}
            </Grid>
            {auth.isAdmin && (
                <>
                    <Divider />
                    <Grid container spacing={16} className="my-4">
                        {createCardInGrid("Scheduler", "scheduler-menu.svg", urlSchedulerMenu, "scheduler option and start to build")}
                        {createCardInGrid("Operators", "operators.svg", urlOperators, "what they can do")}
                        {createCardInGrid("Users", "users.svg", urlUsers, "start new user story from here")}
                        {createCardInGrid("Main Teams", "main-teams.svg", urlMainTeams, "manage main teams - big unit team")}
                        {createCardInGrid("Skills", "skills.svg", urlSkills, "what you demand to operator")}
                        {createCardInGrid("Sub Teams", "sub-teams.svg", urlSubTeams, "small unit team")}
                    </Grid>
                </>
            )}
        </>
    );
};

export default menu;