import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';

const dataset = document.querySelector('script[src*="layout"]').dataset;
const isAuthenticated = JSON.parse(dataset.isAuthenticated.toLowerCase());
const urlMenu = dataset.urlMenu;
const urlLogout = dataset.urlLogout;
const auth = JSON.parse(dataset.auth);

const breadScram = document.querySelector('script[id="breadscram"]');
let breads = null;
let current = null;
if (breadScram)
{
    breads = JSON.parse(breadScram.dataset.breads || null);
    current = JSON.parse(breadScram.dataset.current || null);
}

if (!breadScram || !current)
{
    current = { name: 'Work Scheduler'};
}
else
{
    if (!breads) breads = [];
    breads.unshift({ url: urlMenu, name: 'Work Scheduler'});
}

const nav = ({ opened, handleOpenDrawer }) => {
    const [state, setState] = React.useState({anchorEl: null});
    const open = Boolean(state.anchorEl);

    if (!isAuthenticated) return (<></>);

    return (
		<AppBar className="pl-2" position="static">
			<Toolbar disableGutters>
				<IconButton color="inherit" aria-label="Open drawer" tabIndex="-1"
					onClick={() => handleOpenDrawer()}>
					<MenuIcon />
				</IconButton>
				<Breadcrumbs separator={<NavigateNextRoundedIcon fontSize="small" />} arial-label="Breadcrumb"
					style={{ color: 'white', flexGrow: 1 }}>
					{breads && (
						breads.map((x) => <Link color="inherit" variant="h5" href={x.url} key={x.name}
							style={{ color: 'white' }} tabIndex="-1" noWrap>
							{x.name}
						</Link>)
					)}
					<Typography variant="h5" style={{ color: 'white' }} tabIndex="-1" noWrap>{current.name}</Typography>
				</Breadcrumbs>
				<IconButton className="mr-1" aria-owns={open ? 'menu-appbar' : undefined} color="inherit" tabIndex="-1"
					aria-haspopup="true" onClick={(e) => setState({anchorEl: e.currentTarget})}>
					<AccountCircle />
				</IconButton>
				<Menu anchorEl={state.anchorEl} open={open}
					onClose={() => setState({anchorEl: null})}>
					<MenuItem component="span">{auth.loginId} : {auth.name}</MenuItem>
					<MenuItem component="a" href={urlLogout}>Log out</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
    );
};

export default nav;
