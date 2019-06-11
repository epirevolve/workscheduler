import React from 'react';

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

const userList = ({ users, handleEdit }) => (
    <List css={wrapperCss}>
        {users.map((x) => <User key={x.id} user={x} handleEdit={() => handleEdit(x)} />)}
    </List>
);

export default userList;