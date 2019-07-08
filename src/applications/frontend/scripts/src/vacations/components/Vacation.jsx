import React from 'react';
import propTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const vacation = ({ vacation, edit }) => (
    <ListItem button onClick={edit}>
        <ListItemText primary={vacation.title} />
        <ListItemText primary={vacation.startFrom} />
        <ListItemText primary={vacation.endOn} />
        <ListItemText primary={vacation.daysCount} />
        <ListItemText primary={vacation.participantsCount} />
    </ListItem>
);

vacation.propTypes = {
    vacation: propTypes.object,
    edit: propTypes.func.isRequired
};

export default vacation;