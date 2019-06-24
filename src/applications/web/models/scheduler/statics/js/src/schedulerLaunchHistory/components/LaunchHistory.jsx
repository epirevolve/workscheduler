import React from 'react';
import propTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/** @jsx jsx */
import { jsx } from '@emotion/core';

const launchHistory = ({ team, month, year, adaptability }) => (
    <ListItem>
        <ListItemText primary={team.name} />
        <ListItemText primary={`${month} of ${year}`} />
        <ListItemText primary={adaptability} secondary='adaptability' />
    </ListItem>
);

launchHistory.propTypes = {
    team: propTypes.object.isRequired,
    month: propTypes.number.isRequired,
    year: propTypes.number.isRequired,
    adaptability: propTypes.number.isRequired,
};

export default launchHistory;