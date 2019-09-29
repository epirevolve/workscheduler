import React from 'react';
import propTypes from "prop-types";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import InputVacation from "../containers/InputVacation";
import CommitVacation from "../containers/CommitVacation";

const vacationDialog = ({ isOpen }) => (
    <Dialog open={isOpen} aria-labelledby="vacation-store" maxWidth="lg">
        <DialogTitle>register vacation</DialogTitle>
        <DialogContent>
            <InputVacation />
        </DialogContent>
        <DialogActions>
            <CommitVacation />
        </DialogActions>
    </Dialog>
);

vacationDialog.propTypes = {
    isOpen: propTypes.bool.isRequired
};

export default vacationDialog;