import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const dataset = document.querySelector('script[src*="layout"]').dataset;
const isAuthenticated = JSON.parse(dataset.isAuthenticated.toLowerCase());
const urlMenu = dataset.urlMenu;
const urlLogout = dataset.urlLogout;

const nav = ({ auth, opened, handleOpenDrawer }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    return (
        <AppBar className="pl-2" position="static">
            <Toolbar disableGutters={!opened}>
                {isAuthenticated && (
                    <React.Fragment>
                        <IconButton color="inherit" aria-label="Open drawer"
                            onClick={() => handleOpenDrawer()}>
                            <MenuIcon />
                        </IconButton>
                        <Typography component="a" variant="h5" style={{ color: 'white', flexGrow: 1 }}
                            noWrap href={urlMenu}>
                            Work Scheduler
                        </Typography>
                        <IconButton className="mr-1" aria-owns={open ? 'menu-appbar' : undefined} color="inherit"
                            aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)}>
                            <AccountCircle />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open}
                            onClose={() => setAnchorEl(null)}>
                            <MenuItem component="span">{auth.loginId} : {auth.name}</MenuItem>
                            <MenuItem component="a" href={urlLogout}>Log out</MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
                {!isAuthenticated && (
                    <React.Fragment>
                        <Typography component="a" variant="h5" style={{ color: 'white', flexGrow: 1 }}
                            noWrap href="#" className="ml-3">
                            Work Scheduler
                        </Typography>
                    </React.Fragment>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default nav;
