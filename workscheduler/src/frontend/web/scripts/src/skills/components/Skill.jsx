import React from 'react';
import propTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const skill = ({ skill, edit }) => (
    <ListItem button onClick={edit}>
        <ListItemText primary={skill.name} secondary={`score: ${skill.score}`} />
    </ListItem>
);

skill.propTypes = {
    skill: propTypes.object.isRequired,
    edit: propTypes.func.isRequired
};

export default skill;