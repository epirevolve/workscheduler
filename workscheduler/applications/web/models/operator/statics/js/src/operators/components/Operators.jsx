import React from 'react';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import OperatorList from './OperatorList';

const skills = ({ operators, handleEdit }) => {
    return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                        operators
                    </Typography>
                </Toolbar>
            </AppBar>
            <OperatorList operators={operators} handleEdit={handleEdit} />
        </div>
    )
}

export default skills;