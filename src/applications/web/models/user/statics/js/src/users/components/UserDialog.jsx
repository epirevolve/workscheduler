import React from 'react';
import propTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import InputUser from '../containers/InputUser';
import CommitUser from '../containers/CommitUser';

const userDialog = ({ isOpen }) => (
    <Dialog open={isOpen} aria-labelledby="user-store" maxWidth="lg">
        <DialogTitle>register user</DialogTitle>
        <DialogContent>
            <DialogContentText>
                automatically registered operator info after user registration if he/she is not operator.
            </DialogContentText>
            <InputUser />
        </DialogContent>
        <DialogActions>
            <CommitUser />
        </DialogActions>
    </Dialog>
);

userDialog.propTypes = {
    isOpen: propTypes.bool.isRequired,
};

export default userDialog;
