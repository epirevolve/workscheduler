import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const skill = ({ skill, handleEdit }) => (
    <ListItem button onClick={handleEdit}>
        <ListItemText primary={skill.name} secondary={skill.score} />
    </ListItem>
);

export default skill;