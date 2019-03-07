import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const user = ({ user, handleEdit }) => {
    return (
        <ListItem button onClick={handleEdit}>
            <ListItemText primary={user.name} secondary={`login id: ${user.loginId}, affiliation: ${user.affiliation.name},
                is admin: ${user.isAdmin}, is operator: ${user.isOperator}`} />
        </ListItem>
    )
}

export default user;