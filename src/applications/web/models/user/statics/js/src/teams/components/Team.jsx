import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const team = ({ team, handleEdit }) => (
    <ListItem button onClick={handleEdit}>
        <ListItemText primary={team.name} secondary={`note: ${team.note}`} />
    </ListItem>
);

export default team;