import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const operator = ({ operator, handleEdit }) => {
    let ojt = operator.ojt || "";
    if (ojt) ojt = ` ojt: ${ojt.user.name}`;
    return (
        <ListItem button onClick={handleEdit}>
            <ListItemText primary={operator.user.name} secondary={`affiliation: ${operator.user.affiliation.name}${ojt}`} />
        </ListItem>
    )
}

export default operator;