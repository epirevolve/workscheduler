import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import MainTeamList from './MainTeamList';

const mainTeams = ({ handleAppend, ...other }) => (
    <>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    main teams
                </Typography>
                <div style={{ textAlign: 'right' }}>
                    <IconButton onClick={handleAppend}>
                        <AddIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        <MainTeamList {...other} />
    </>
);

export default mainTeams;