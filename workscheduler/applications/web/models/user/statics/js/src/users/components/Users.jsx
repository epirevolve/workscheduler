import React from 'react';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import UserList from './UserList';

const users = ({ users, handleAppend, handleEdit }) => {
    return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                        users
                    </Typography>
                    <div style={{ textAlign: 'right' }}>
                        <IconButton onClick={handleAppend}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <UserList users={users} handleEdit={handleEdit} />
        </div>
    )
}

export default users;