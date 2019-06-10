import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const user = ({ user, handleEdit }) => (
	<ListItem button onClick={handleEdit} className={user.isInactivated ? "inactivated" : ""}>
		<ListItemText primary={user.name} secondary={`login id: ${user.loginId}, team: ${user.team.name},
			is admin: ${user.isAdmin}, is operator: ${user.isOperator}`} />
	</ListItem>
);

export default user;