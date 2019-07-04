import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const team = ({ team, edit }) => (
    <ListItem button onClick={edit}>
        <ListItemText primary={team.name} secondary={`note: ${team.note}`} />
    </ListItem>
);

export default team;