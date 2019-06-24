import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import OperatorList from './OperatorList';

const skills = ({ ...other }) => (
    <>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    operators
                </Typography>
            </Toolbar>
        </AppBar>
        <OperatorList {...other} />
    </>
);

export default skills;