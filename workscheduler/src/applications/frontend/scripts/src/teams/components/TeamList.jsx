import React from 'react';
import propTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import Team from './Team';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { mt2 } from 'margin';

const listCss = css({
    maxHeight: '78vh',
    overflowY: 'auto'
});

const teamList = ({ teams, append, edit }) => (
    <>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    teams
                </Typography>
                <Box style={{ textAlign: 'right' }}>
                    <IconButton onClick={append}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        <Box css={mt2}>
            <List css={listCss}>
                {teams.map((x, i) => <Team key={i} team={x} edit={() => edit(x)} />)}
            </List>
        </Box>
    </>
);

teamList.propTypes = {
    teams: propTypes.array,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired,
};

export default teamList;