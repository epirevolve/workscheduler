import React from 'react';
import propTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import InputOperator from '../containers/InputOperator';
import CommitOperator from '../containers/CommitOperator';

const operatorDialog = ({ isOpen }) => (
    <Dialog open={isOpen} aria-labelledby="operator-store" maxWidth="lg">
        <DialogTitle>register operator</DialogTitle>
        <DialogContent>
            <InputOperator />
        </DialogContent>
        <DialogActions>
            <CommitOperator />
        </DialogActions>
    </Dialog>
);

operatorDialog.propTypes = {
    isOpen: propTypes.bool.isRequired,
};

export default operatorDialog;