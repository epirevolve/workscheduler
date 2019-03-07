import React from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const $script = $('script[src*="users"]');
const affiliations = $script.data('affiliations');

const userDialog = ({ userDialog, onLoginIdChange, onNameChange, onAffiliationChange,
    onIsAdminChanged, onIsUserChanged, handleClose, handleInactivate, handleResetPassword, handleSave }) => {

    const affiliationList = affiliations.map(x =>
        <MenuItem key={x.id} value={x}>
            {x.name}
        </MenuItem>)

    let affiliation = userDialog.affiliation || "";
    if (affiliation && affiliations.map(x => x.id).includes(affiliation.id)) affiliation = affiliations.find(x => x.id == affiliation.id);

    return (
        <Dialog open={userDialog.isOpen} aria-labelledby="user-store">
            <DialogTitle id="simple-dialog-title">register user</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please register user info.
                </DialogContentText>
                <TextField autoFocus margin="dense" label="login id" fullWidth
                    onChange={onLoginIdChange} value={userDialog.loginId} />
                <TextField autoFocus margin="dense" label="name" fullWidth
                    onChange={onNameChange} value={userDialog.name} />
                <Select value={affiliation} onChange={onAffiliationChange} label="affiliation">
                    {affiliationList}
                </Select>
                <FormControlLabel
                    control={<Checkbox checked={userDialog.isAdmin}
                        onChange={onIsAdminChanged} color="primary" />}
                    label="is admin" />
                <FormControlLabel
                    control={<Checkbox checked={userDialog.isUser}
                        onChange={onIsUserChanged} color="primary" />}
                    label="is user" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Close
                </Button>
                {userDialog.id && (
                    <React.Fragment>
                        <Button onClick={() => handleInactivate(userDialog.id)} variant="outlined" color="secondary">
                            Inactivate
                        </Button>
                        <Button onClick={() => handleResetPassword(userDialog.id)} variant="outlined" color="secondary">
                            Reset Password
                        </Button>
                    </React.Fragment>
                )}
                <Button onClick={() => handleSave(userDialog)} variant="outlined" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default userDialog;
