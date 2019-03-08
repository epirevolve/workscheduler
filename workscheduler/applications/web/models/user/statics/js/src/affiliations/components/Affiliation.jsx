import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const affiliation = ({ affiliation, handleEdit }) => {
    return (
        <ListItem button onClick={handleEdit}>
            <ListItemText primary={affiliation.name} secondary={`note: ${affiliation.note}`} />
        </ListItem>
    )
}

export default affiliation;