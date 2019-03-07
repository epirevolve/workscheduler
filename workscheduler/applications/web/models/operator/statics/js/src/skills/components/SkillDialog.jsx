import React from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const skillDialog = ({ skillDialog, onNameChange, onScoreChange, onIsCertifiedChanged,
    handleClose, handleRemove, handleSave }) => {
    return (
        <Dialog open={skillDialog.isOpen} aria-labelledby="skill-store">
            <DialogTitle id="simple-dialog-title">register skill</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To evaluate operator skill, please register proper skills.
                </DialogContentText>
                <TextField autoFocus margin="dense" label="name" fullWidth
                    onChange={onNameChange} value={skillDialog.name} />
                <TextField autoFocus margin="dense" label="score" fullWidth type="number"
                    onChange={onScoreChange} value={skillDialog.score} />
                <FormControlLabel
                    control={<Switch checked={skillDialog.isCertified}
                        onChange={onIsCertifiedChanged} color="primary" />}
                    label="is certified" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Close
                </Button>
                {skillDialog.id && (
                    <Button onClick={() => handleRemove(skillDialog.id)} variant="outlined" color="secondary">
                        Remove
                    </Button>
                )}
                <Button onClick={() => handleSave(skillDialog)} variant="outlined" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default skillDialog;
