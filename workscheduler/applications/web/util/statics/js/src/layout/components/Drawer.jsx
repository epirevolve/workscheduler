import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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

const drawer = ({ auth, opened, handleCloseDrawer }) => {
    return (
        <Drawer open={opened} onClose={() => handleCloseDrawer()}>
            <div tabIndex={0}>
                <IconButton onClick={() => handleCloseDrawer()}>
                    <ChevronLeftIcon />
                </IconButton>
                <Divider />
                <List component="nav">
                    <ListItem button component="a" key="schedules" href={urlSchedules}>
                        <ListItemText primary="schedules" className="menuText" />
                    </ListItem>
                    {auth.isOperator && (
                        <React.Fragment>
                            <ListItem button component="a" key="requests" href={urlRequests}>
                                <ListItemText primary="requests" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="asoperator" href={urlAsOperator}>
                                <ListItemText primary="as operator" className="menuText" />
                            </ListItem>
                        </React.Fragment>
                    )}
                    <ListItem button component="a" key="asuser" href={urlAsUser}>
                        <ListItemText primary="as user" className="menuText" />
                    </ListItem>
                    <Divider />
                    {auth.isAdmin && (
                        <React.Fragment>
                            <ListItem button component="a" key="scheduler" href={urlSchedulerMenu}>
                                <ListItemText primary="scheduler" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="operators" href={urlOperators}>
                                <ListItemText primary="operators" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="users" href={urlUsers}>
                                <ListItemText primary="users" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="affiliations" href={urlAffiliations}>
                                <ListItemText primary="affiliations" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="skills" href={urlSkills}>
                                <ListItemText primary="skills" className="menuText" />
                            </ListItem>
                            <ListItem button component="a" key="teams" href={urlTeams}>
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