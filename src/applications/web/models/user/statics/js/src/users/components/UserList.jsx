import React from 'react';
import propTypes from 'prop-types';

import List from '@material-ui/core/List';

import User from './User';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mt1 } from 'margin';

const wrapperCss = css({
	maxHeight: '78vh',
	overflowY: 'auto'
},
mt1);

const userList = ({ users, edit }) => (
    <List css={wrapperCss}>
        {users.map((x, i) => <User key={i} user={x} edit={() => edit(x)} />)}
    </List>
);

userList.propTypes = {
    users: propTypes.array,
    edit: propTypes.func.isRequired
};

export default userList;