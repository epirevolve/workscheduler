import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import HearingRoundedIcon from '@material-ui/icons/HearingRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';

const dataset = document.querySelector('script[src*="layout"]').dataset;
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

const drawer = ({ opened, handleCloseDrawer }) => {
    return (
        <Drawer open={opened} onClose={() => handleCloseDrawer()}>
            <div tabIndex={0}>
                <IconButton onClick={() => handleCloseDrawer()}>
                    <ChevronLeftRoundedIcon />
                </IconButton>
                <Divider />
                <List component="nav">
                    <ListItem button component="a" key="schedules" href={urlSchedules}>
                        <ListItemIcon>
                            <CalendarTodayRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="schedules" className="menuText" />
                    </ListItem>
                    {auth.isOperator && (
                        <React.Fragment>
                            <ListItem button component="a" key="requests" href={urlRequests}>
                                <ListItemIcon>
                                    <HearingRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="requests" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="asoperator" href={urlAsOperator}>
                                <ListItemIcon>
                                    <PersonRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="as operator" className="menuText" />
                            </ListItem>
                        </React.Fragment>
                    )}
                    <ListItem button component="a" key="asuser" href={urlAsUser}>
                        <ListItemIcon>
                            <PersonRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="as user" className="menuText" />
                    </ListItem>
                    <Divider />
                    {auth.isAdmin && (
                        <React.Fragment>
                            <ListItem button component="a" key="scheduler" href={urlSchedulerMenu}>
                                <ListItemIcon>
                                    <BuildRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="scheduler" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="operators" href={urlOperators}>
                                <ListItemIcon>
                                    <GroupRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="operators" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="users" href={urlUsers}>
                                <ListItemIcon>
                                    <GroupRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="users" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="affiliations" href={urlAffiliations}>
                                <ListItemIcon>
                                    <LocationCityRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="affiliations" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="skills" href={urlSkills}>
                                <ListItemIcon>
                                    <CalendarTodayRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="skills" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="teams" href={urlTeams}>
                                <ListItemIcon>
                                    <CalendarTodayRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="teams" className="menuText" />
                            </ListItem>
                        </React.Fragment>
                    )}
                </List>
            </div>
        </Drawer>
    )
}

export default drawer;