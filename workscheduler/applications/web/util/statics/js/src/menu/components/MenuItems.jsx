import React from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import MenuCard from 'MenuCard';

const dataset = document.querySelector('script[src*="main-menu"]').dataset;
const urlSchedules = dataset.urlSchedules
const urlRequests = dataset.urlRequests
const urlAsOperator = dataset.urlAsOperator
const urlAsUser = dataset.urlAsUser
const urlSchedulerMenu = dataset.urlSchedulerMenu
const urlOperators = dataset.urlOperators
const urlUsers = dataset.urlUsers
const urlAffiliations = dataset.urlAffiliations
const urlSkills = dataset.urlSkills
const urlTeams = dataset.urlTeams
const auth = JSON.parse(dataset.auth);

const menuItems = () => {
    return (
        <React.Fragment>
            <Grid container spacing={16} className="my-4">
                <Grid item xs={12} md={6} lg={3}>
                    <MenuCard title="Schedules" img="/statics/img/schedules.svg" href={urlSchedules}
                        description="your work schedule and ask change some days" />
                </Grid>
                {auth.isOperator && (
                    <React.Fragment>
                        <Grid item xs={12} md={6} lg={3}>
                            <MenuCard title="Requests" img="/statics/img/request.svg" href={urlRequests}
                                description="request days you wanna get rest" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MenuCard title="As Operator" img="/statics/img/operator.svg" href={urlAsOperator}
                                description="appeal what you can do by registering skill" />
                        </Grid>
                    </React.Fragment>
                )}
                <Grid item xs={12} md={6} lg={3}>
                    <MenuCard title="As User" img="/statics/img/user.svg" href={urlAsUser}
                        description="reset your password" />
                </Grid>
            </Grid>
            {auth.isAdmin && (
                <React.Fragment>
                    <Divider />
                    <Grid container spacing={16} className="my-3">
                        <Grid item xs={12} md={6} lg={3}>
                            <MenuCard title="Scheduler" img="/statics/img/scheduler-menu.svg" href={urlSchedulerMenu}
                                description="scheduler option and start to build" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MenuCard title="Operators" img="/statics/img/operators.svg" href={urlOperators}
                                description="what they can do" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MenuCard title="Users" img="/statics/img/users.svg" href={urlUsers}
                                description="start new user story from here" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MenuCard title="Affiliations" img="/statics/img/affiliations.svg" href={urlAffiliations}
                                description="manage affiliation - big unit team" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MenuCard title="Skills" img="/statics/img/skills.svg" href={urlSkills}
                                description="what you demand to operator" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MenuCard title="Teams" img="/statics/img/teams.svg" href={urlTeams}
                                description="small unit team" />
                        </Grid>
                    </Grid>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default menuItems;