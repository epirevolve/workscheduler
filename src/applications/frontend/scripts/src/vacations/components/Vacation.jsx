import React from 'react';
import propTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const vacation = ({ vacation, edit }) => (
    <ListItem button onClick={edit}>
        <ListItemText primary={vacation.title} />
        <ListItemText primary={`${vacation.daysCount} days`} />
        <ListItemText primary={vacation.onFrom} />
        <ListItemText primary={vacation.onTo} />
    </ListItem>
);

vacation.propTypes = {
    vacation: propTypes.object,
    edit: propTypes.func.isRequired
};

export default vacation;