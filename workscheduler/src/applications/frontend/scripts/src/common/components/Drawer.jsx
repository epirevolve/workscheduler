import React from 'react';
import propTypes from 'prop-types';

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
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const menuTextCss = css({
    '& > span': {
        fontSize: '1.3rem',
        color: 'gray'
}});

const dataset = document.querySelector('#linkTags').dataset;
const urlSchedules = dataset.urlSchedules;
const urlRequests = dataset.urlRequests;
const urlAsOperator = dataset.urlAsOperator;
const urlAsUser = dataset.urlAsUser;
const urlSchedulerMenu = dataset.urlSchedulerMenu;
const urlOperators = dataset.urlOperators;
const urlUsers = dataset.urlUsers;
const urlTeams = dataset.urlTeams;
const urlSkills = dataset.urlSkills;
const auth = JSON.parse(dataset.auth);

const authRole = auth.role ? auth.role._value_ : -1;

const drawer = ({ open, setOpen }) => (
    <Drawer open={open} onClose={() => setOpen((prev) => ({ ...prev, open: false }))}>
        <Box tabIndex={0}>
            <IconButton onClick={() => setOpen((prev) => ({ ...prev, open: false }))}>
                <ChevronLeftRoundedIcon />
            </IconButton>
            <Divider />
            <List component="nav">
                <ListItem button component="a" key="schedule" href={urlSchedules}>
                    <ListItemIcon>
                        <CalendarTodayRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="schedule" css={menuTextCss} />
                </ListItem>
                {authRole && (
                    <>
                        <ListItem button component="a" key="requests" href={urlRequests}>
                            <ListItemIcon>
                                <HearingRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="requests" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="asoperator" href={urlAsOperator}>
                            <ListItemIcon>
                                <PersonRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="as operator" css={menuTextCss} />
                        </ListItem>
                    </>
                )}
                <ListItem button component="a" key="asuser" href={urlAsUser}>
                    <ListItemIcon>
                        <PersonRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="as user" css={menuTextCss} />
                </ListItem>
                <Divider />
                {authRole == 2 && (
                    <>
                        <ListItem button component="a" key="scheduler" href={urlSchedulerMenu}>
                            <ListItemIcon>
                                <BuildRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="scheduler" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="operators" href={urlOperators}>
                            <ListItemIcon>
                                <GroupRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="operators" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="users" href={urlUsers}>
                            <ListItemIcon>
                                <GroupRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="users" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="teams" href={urlTeams}>
                            <ListItemIcon>
                                <LocationCityRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="teams" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="skills" href={urlSkills}>
                            <ListItemIcon>
                                <StarRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="skills" css={menuTextCss} />
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    </Drawer>
);

drawer.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired,
};

export default drawer;