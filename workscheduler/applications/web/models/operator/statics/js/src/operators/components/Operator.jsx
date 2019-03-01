import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const operator = ({ operator, handleEdit }) => {
    return (
        <ListItem button onClick={handleEdit}>
            <ListItemText primary={operator.user.name} secondary={operator.user.affiliation.name} />
        </ListItem>
    )
}

export default operator;