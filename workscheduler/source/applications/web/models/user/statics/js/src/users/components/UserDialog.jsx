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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const affiliations = $('script[src*="users"]').data('affiliations');

const userDialog = ({ userDialog, onLoginIdChange, onNameChange, onAffiliationChange,
    onIsAdminChange, onIsOperatorChange, handleClose, handleInactivate, handleResetPassword, handleSave }) => {

    const affiliationList = affiliations.map(x =>
        <MenuItem key={x.id} value={x}>
            {x.name}
        </MenuItem>)

    let affiliation = userDialog.affiliation || "";
    if (affiliation && affiliations.map(x => x.id).includes(affiliation.id)) affiliation = affiliations.find(x => x.id == affiliation.id);

    return (
        <Dialog open={userDialog.isOpen} aria-labelledby="user-store" maxWidth="lg">
            <DialogTitle>register user</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    automatically registered operator info after user registration if he/she is not operator.
                </DialogContentText>
                <TextField autoFocus margin="dense" label="login id" fullWidth required
                    onChange={onLoginIdChange} value={userDialog.loginId} />
                <TextField margin="dense" label="name" fullWidth required
                    onChange={onNameChange} value={userDialog.name} />
                <FormControl margin="dense">
                    <InputLabel htmlFor="affiliation">affiliation</InputLabel>
                    <Select value={affiliation} id="affiliation" onChange={onAffiliationChange}>
                        {affiliationList}
                    </Select>
                </FormControl>
                <br />
                <FormControlLabel margin="dense"
                    control={<Checkbox checked={userDialog.isAdmin}
                        onChange={onIsAdminChange} color="primary" />}
                    label="is admin" />
                <FormControlLabel margin="dense"
                    control={<Checkbox checked={userDialog.isOperator}
                        onChange={onIsOperatorChange} color="primary" />}
                    label="is operator" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default" className="mr-1">
                    Close
                </Button>
                {userDialog.id && (
                    <>
                        <Button onClick={() => handleInactivate(userDialog.id)} variant="outlined"
                            color="secondary" className="mr-1">
                            Inactivate
                        </Button>
                        <Button onClick={() => handleResetPassword(userDialog.id)} variant="outlined"
                            color="secondary" className="mr-1">
                            Reset Password
                        </Button>
                    </>
                )}
                <Button onClick={() => handleSave(userDialog)} variant="outlined" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default userDialog;