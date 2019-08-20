import React from 'react';
import propTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/** @jsx jsx */
import { jsx } from '@emotion/core';

const launchHistory = ({ team, month, year, processStatus, adaptability, createAt }) => (
    <ListItem>
        <ListItemText primary={team.name} />
        <ListItemText primary={`${year}-${month}`} secondary='schedule of' />
        <ListItemText primary={processStatus.__name__} secondary='status' />
        <ListItemText primary={adaptability} secondary='adaptability' />
        <ListItemText primary={`${createAt} UTC`} secondary='create at' />
    </ListItem>
);

launchHistory.propTypes = {
    team: propTypes.object.isRequired,
    month: propTypes.number.isRequired,
    year: propTypes.number.isRequired,
    processStatus: propTypes.object,
    adaptability: propTypes.number.isRequired,
    createAt: propTypes.any
};

export default launchHistory;