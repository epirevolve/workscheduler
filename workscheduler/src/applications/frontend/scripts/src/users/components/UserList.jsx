import React from 'react';
import propTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';

import User from './User';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { mt1 } from 'margin';

const wrapperCss = css({
    maxHeight: '78vh',
    overflowY: 'auto'
}, mt1);

const userList = ({ users, append, edit }) => (
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
        <List css={wrapperCss}>
            {users.map((x, i) => <User key={i} user={x} edit={() => edit(x)} />)}
        </List>
    </div>
);

userList.propTypes = {
    users: propTypes.array,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired,
};

export default userList;