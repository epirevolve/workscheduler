import React from 'react';
import propTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

/** @jsx jsx */
import { jsx } from '@emotion/core';

const currentRunner = ({ team, month, year, teminateRunner }) => (
    <ListItem>
        <ListItemText primary={team.name} />
        <ListItemText primary={`${month} of ${year}`} />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="terminate" onClick={teminateRunner}>
                <CancelRoundedIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

currentRunner.propTypes = {
    team: propTypes.object.isRequired,
    month: propTypes.number.isRequired,
    year: propTypes.number.isRequired,
    teminateRunner: propTypes.func.isRequired,
};

export default currentRunner;