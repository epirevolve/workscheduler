import React from 'react';
import propTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const fixedSchedule = ({ fixedSchedule, edit }) => (
    <ListItem button onClick={edit}>
        <ListItemText primary={fixedSchedule.title} />
        <ListItemText primary={fixedSchedule.onFrom} />
        <ListItemText primary={fixedSchedule.onTo} />
        <ListItemText primary={fixedSchedule.atFrom} />
        <ListItemText primary={fixedSchedule.atTo} />
        <ListItemText primary={fixedSchedule.participants.map((x) => x.user.name).join(', ')} />
    </ListItem>
);

fixedSchedule.propTypes = {
    fixedSchedule: propTypes.object,
    edit: propTypes.func.isRequired,
};

export default fixedSchedule;