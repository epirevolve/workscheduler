import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const teams = $('script[src*="users"]').data('teams');

const userDialog = ({ userDialog, onLoginIdChange, onNameChange, onTeamChange,
    onIsAdminChange, onIsOperatorChange, handleClose, handleInactivate, handleResetPassword, handleSave }) => {

    const teamList = teams.map((x) =>
        <MenuItem key={x.id} value={x}>
            {x.name}
        </MenuItem>);

    let team = userDialog.team || "";
    if (team && teams.map((x) => x.id).includes(team.id)) team = teams.find((x) => x.id == team.id);

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
                    <InputLabel htmlFor="team">team</InputLabel>
                    <Select value={team} id="team" onChange={onTeamChange}>
                        {teamList}
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
    );
};

export default userDialog;
