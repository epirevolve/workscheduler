import React from 'react';

import Divider from '@material-ui/core/Divider';

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
            <div className="my-4" style={{ display: "flex" }}>
                <MenuCard title="Schedules" img="/statics/img/schedules.svg" href={urlSchedules}
                    description="set require number of member each day and prefixed schedule" />
                {auth.isOperator && (
                    <React.Fragment>
                        <MenuCard title="Requests" img="/statics/img/request.svg" href={urlRequests}
                            description="set require number of member each day and prefixed schedule" />
                        <MenuCard title="As Operator" img="/statics/img/operator.svg" href={urlAsOperator}
                            description="set require number of member each day and prefixed schedule" />
                    </React.Fragment>
                )}
                <MenuCard title="As User" img="/statics/img/user.svg" href={urlAsUser}
                    description="set require number of member each day and prefixed schedule" />
            </div>
            {auth.isAdmin && (
                <React.Fragment>
                    <Divider />
                    <div className="my-3" style={{ display: "flex" }}>
                        <MenuCard title="Scheduler" img="/statics/img/scheduler-menu.svg" href={urlSchedulerMenu}
                            description="set require number of member each day and prefixed schedule" />
                        <MenuCard title="Operators" img="/statics/img/operators.svg" href={urlOperators}
                            description="set require number of member each day and prefixed schedule" />
                        <MenuCard title="Users" img="/statics/img/users.svg" href={urlUsers}
                            description="set require number of member each day and prefixed schedule" />
                        <MenuCard title="Affiliations" img="/statics/img/affiliations.svg" href={urlAffiliations}
                            description="set require number of member each day and prefixed schedule" />
                    </div>
                    <div className="my-3" style={{ display: "flex" }}>
                        <MenuCard title="Skills" img="/statics/img/skills.svg" href={urlSkills}
                            description="set require number of member each day and prefixed schedule" />
                        <MenuCard title="Teams" img="/statics/img/teams.svg" href={urlTeams}
                            description="set require number of member each day and prefixed schedule" />
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default menuItems;