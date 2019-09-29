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

import { currentOperator } from "../embeddedData";

const currentUser = currentOperator.user;
const authRole = currentUser.role ? currentUser.role._value_ : -1;

const drawer = ({ open, setOpen }) => (
    <Drawer open={open} onClose={() => setOpen((prev) => ({ ...prev, open: false }))}>
        <Box tabIndex={0}>
            <IconButton onClick={() => setOpen((prev) => ({ ...prev, open: false }))}>
                <ChevronLeftRoundedIcon />
            </IconButton>
            <Divider />
            <List component="nav">
                <ListItem button component="a" key="schedule" href={'/schedule'}>
                    <ListItemIcon>
                        <CalendarTodayRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="schedule" css={menuTextCss} />
                </ListItem>
                {authRole == 3 && (
                    <>
                        <ListItem button component="a" key="requests" href={'/scheduler/requests'}>
                            <ListItemIcon>
                                <HearingRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="requests" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="asoperator" href={`/operator/myself/${currentOperator.id}`}>
                            <ListItemIcon>
                                <PersonRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="as operator" css={menuTextCss} />
                        </ListItem>
                    </>
                )}
                <ListItem button component="a" key="asuser" href={`/user/myself/${currentUser.id}`}>
                    <ListItemIcon>
                        <PersonRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="as user" css={menuTextCss} />
                </ListItem>
                <Divider />
                {authRole == 2 && (
                    <>
                        <ListItem button component="a" key="scheduler" href={'/scheduler/menu'}>
                            <ListItemIcon>
                                <BuildRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="scheduler" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="operators" href={'/operator/operators'}>
                            <ListItemIcon>
                                <GroupRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="operators" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="users" href={'/user/users'}>
                            <ListItemIcon>
                                <GroupRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="users" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="teams" href={'/user/teams'}>
                            <ListItemIcon>
                                <LocationCityRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="teams" css={menuTextCss} />
                        </ListItem>
                        <ListItem button component="a" key="skills" href={'/operator/skills'}>
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