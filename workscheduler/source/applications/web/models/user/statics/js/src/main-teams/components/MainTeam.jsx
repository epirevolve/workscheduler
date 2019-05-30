import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const mainTeam = ({ mainTeam, handleEdit }) => {
    return (
        <ListItem button onClick={handleEdit}>
            <ListItemText primary={mainTeam.name} secondary={`note: ${mainTeam.note}`} />
        </ListItem>
    )
}

export default mainTeam;