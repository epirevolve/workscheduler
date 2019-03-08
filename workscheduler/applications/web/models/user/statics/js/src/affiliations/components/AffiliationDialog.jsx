import React from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const affiliationDialog = ({ affiliationDialog, onNameChange, onNoteChange,
    handleClose, handleRemove, handleSave }) => {

    return (
        <Dialog open={affiliationDialog.isOpen} aria-labelledby="affiliation-store" maxWidth="lg">
            <DialogTitle>register affiliation</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" label="name" fullWidth required
                    onChange={onNameChange} value={affiliationDialog.name} />
                <TextField margin="dense" label="note" fullWidth multiline rowsMax="5" variant="outlined"
                    onChange={onNoteChange} value={affiliationDialog.note} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default" className="mr-1">
                    Close
                </Button>
                {affiliationDialog.id && (
                    <Button onClick={() => handleRemove(affiliationDialog.id)} variant="outlined"
                        color="secondary" className="mr-1">
                        Remove
                    </Button>
                )}
                <Button onClick={() => handleSave(affiliationDialog)} variant="outlined" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default affiliationDialog;
