import React from 'react';
import propTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const inactivatedCss = {
    background: 'lightgray'
};

const user = ({ user, edit }) => (
	<ListItem button onClick={edit} css={user.isInactivated ? inactivatedCss : null} alignItems="flex-start">
		<ListItemText primary={user.name} css={css({width: '20%'})} />
		<ListItemText primary={user.loginId} secondary={'login id'} css={css({width: '10%'})} />
		<ListItemText primary={user.team.name} secondary={'team'} css={css({width: '10%'})} />
		{user.isAdmin && <ListItemText primary={'admin'} />}
		{user.isOperator && <ListItemText primary={'operator'} />}
	</ListItem>
);

user.propTypes = {
	user: propTypes.object.isRequired,
	edit: propTypes.func.isRequired
};

export default user;