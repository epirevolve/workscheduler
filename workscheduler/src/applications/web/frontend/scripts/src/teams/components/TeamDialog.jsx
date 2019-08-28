import React from 'react';
import propTypes from "prop-types";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import InputTeam from "../containers/InputTeam";
import CommitTeam from "../containers/CommitTeam";

const teamDialog = ({ isOpen }) => (
    <Dialog open={isOpen} aria-labelledby="team-store" maxWidth="lg">
        <DialogTitle>register team</DialogTitle>
        <DialogContent>
            <InputTeam />
        </DialogContent>
        <DialogActions>
            <CommitTeam />
        </DialogActions>
    </Dialog>
);

teamDialog.propTypes = {
    isOpen: propTypes.bool.isRequired
};

export default teamDialog;