import React from 'react';
import propTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import InputFixedSchedule from '../containers/InputFixedSchedule';
import CommitFixedSchedule from '../containers/CommitFixedSchedule';

const fixedScheduleDialog = ({ isOpen }) => (
    <Dialog open={isOpen} aria-labelledby="fixedSchedule-store">
        <DialogTitle>register fixed schedule</DialogTitle>
        <DialogContent>
            <DialogContentText>
                set fixed schedule to participate in seminar or lesson
            </DialogContentText>
            <InputFixedSchedule />
        </DialogContent>
        <DialogActions>
            <CommitFixedSchedule />
        </DialogActions>
    </Dialog>
);

fixedScheduleDialog.propTypes = {
    isOpen: propTypes.bool.isRequired,
};

export default fixedScheduleDialog;
