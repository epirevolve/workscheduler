import React from 'react';
import propTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import InputRequest from "../containers/InputRequest";
import CommitRequest from "../containers/CommitRequest";

const requestDialog = ({ isOpen }) => (
    <Dialog open={isOpen} aria-labelledby="request-store" maxWidth="lg">
        <DialogTitle>register request</DialogTitle>
        <DialogContent>
            <DialogContentText>
                to set your scheduled holiday, please submit your request
            </DialogContentText>
            <DialogContentText>
                this request is not shown to administrators
            </DialogContentText>
            <InputRequest />
        </DialogContent>
        <DialogActions>
            <CommitRequest />
        </DialogActions>
    </Dialog>
);

requestDialog.propTypes = {
    isOpen: propTypes.bool.isRequired,
};

export default requestDialog;