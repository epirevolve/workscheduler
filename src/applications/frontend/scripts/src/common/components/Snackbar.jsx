import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { SUCCESS, ERROR, WARNING, INFO } from 'snackbarTypes';

const statusColoring = ({
    SUCCESS: css({ backgroundColor: '#43a047' }),
    ERROR: css({ backgroundColor: '#d32f2f' }),
    WARNING: css({ backgroundColor: '#ffa000' }),
    INFO: css({ backgroundColor: '#1976d2' }),
});

const snackbar = ({ isOpen, message, status = INFO, handleClose }) => (
    <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center', }}
        open={isOpen}
        onClose={handleClose}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}>
        <SnackbarContent
            aria-describedby="client-snackbar"
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>,
            ]}
            message={<span id="message-id">{message}</span>}
            css={statusColoring[status]} />
    </Snackbar>
);

export default snackbar;