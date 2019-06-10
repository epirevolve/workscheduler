import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import OperatorList from './OperatorList';

const skills = ({ ...other }) => (
    <div>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                    operators
                </Typography>
            </Toolbar>
        </AppBar>
        <OperatorList {...other} />
    </div>
);

export default skills;