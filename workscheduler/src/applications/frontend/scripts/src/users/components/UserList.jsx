import React from 'react';
import propTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import User from './User';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { mt2 } from 'margin';

const listCss = css({
    maxHeight: '78vh',
    overflowY: 'auto'
});

const userList = ({ users, append, edit }) => (
    <Box>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
                    users
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
                {users.map((x, i) => <User key={i} user={x} edit={() => edit(x)} />)}
            </List>
        </Box>
    </Box>
);

userList.propTypes = {
    users: propTypes.array,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired,
};

export default userList;