import React from 'react';
import propTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const team = ({ team, edit }) => (
    <ListItem button onClick={edit}>
        <ListItemText primary={team.name} secondary={`note: ${team.note}`} />
    </ListItem>
);

team.propTypes = {
    team: propTypes.object,
    edit: propTypes.func.isRequired
};

export default team;