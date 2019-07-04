import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const user = ({
        user, onPasswordChange, onNameChange, handleSave
    }) => (
    <>
        <TextField disabled value={user.loginId} label="login id" fullWidth margin="dense" />
        <TextField type="password" value={user.password} label="password" fullWidth
            autoFocus margin="dense" onChange={onPasswordChange} required />
        <TextField value={user.name} label="name" fullWidth margin="dense"
            onChange={onNameChange} required />
        <TextField disabled value={user.team.name} label="team" fullWidth margin="dense" />
        <Button variant="contained" onClick={() => handleSave(user)} className="mt-3" color="primary">
            Store User
        </Button>
    </>
);

export default user;