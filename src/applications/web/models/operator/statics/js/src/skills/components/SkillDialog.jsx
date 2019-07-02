import React from 'react';
import propTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import InputSkill from '../containers/InputSkill';
import CommitSkill from '../containers/CommitSkill';

const skillDialog = ({ isOpen }) => (
    <Dialog open={isOpen} aria-labelledby="skill-store">
        <DialogTitle>register skill</DialogTitle>
        <DialogContent>
            <DialogContentText>
                certified skills are shown to operators
            </DialogContentText>
            <DialogContentText>
                and not certified skills are shown to administrators
            </DialogContentText>
            <InputSkill />
        </DialogContent>
        <DialogActions>
            <CommitSkill />
        </DialogActions>
    </Dialog>
);

skillDialog.propTypes = {
    isOpen: propTypes.bool.isRequired,
};

export default skillDialog;
