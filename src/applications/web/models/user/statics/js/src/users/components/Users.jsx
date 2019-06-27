import React from 'react';
import propTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import UserList from './UserList';

const users = ({ append, ...other }) => (
    <div>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
                    users
                </Typography>
                <div style={{ textAlign: 'right' }}>
                    <IconButton onClick={append}>
                        <AddIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        <UserList {...other} />
    </div>
);

users.propTypes = {
    append: propTypes.func.isRequired
};

export default users;