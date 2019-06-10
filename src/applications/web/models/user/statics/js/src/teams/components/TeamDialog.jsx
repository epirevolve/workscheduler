import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const teamDialog = ({ teamDialog, onNameChange, onNoteChange,
    handleClose, handleRemove, handleSave }) => (
    <Dialog open={teamDialog.isOpen} aria-labelledby="team-store" maxWidth="lg">
        <DialogTitle>register team</DialogTitle>
        <DialogContent>
            <TextField autoFocus margin="dense" label="name" fullWidth required
                onChange={onNameChange} value={teamDialog.name} />
            <TextField margin="dense" label="note" fullWidth multiline rowsMax="5" variant="outlined"
                onChange={onNoteChange} value={teamDialog.note} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="default" className="mr-1">
                Close
            </Button>
            {teamDialog.id && (
                <Button onClick={() => handleRemove(teamDialog.id)} variant="outlined"
                    color="secondary" className="mr-1">
                    Remove
                </Button>
            )}
            <Button onClick={() => handleSave(teamDialog)} variant="outlined" color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>
);

export default teamDialog;
