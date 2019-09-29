import React from 'react';
import propTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

/** @jsx jsx */
import { jsx } from '@emotion/core';

const currentRunner = ({ team, month, year, processStatus, teminateRunner }) => (
    <ListItem>
        <ListItemText primary={team.name} />
        <ListItemText primary={`${year}-${month}`} secondary='schedule of' />
        <ListItemText primary={processStatus._name_} secondary='status' />
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
    processStatus: propTypes.object,
    teminateRunner: propTypes.func.isRequired,
};

export default currentRunner;