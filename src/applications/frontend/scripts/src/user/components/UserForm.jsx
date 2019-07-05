import React from 'react';
import propTypes from "prop-types";

import TextField from '@material-ui/core/TextField';

const userForm = ({
        user, changePassword, changeName
    }) => (
    <>
        <TextField disabled value={user.loginId} label="login id" fullWidth margin="dense" />
        <TextField type="password" value={user.password} label="password" fullWidth
            autoFocus margin="dense" onChange={changePassword} required />
        <TextField value={user.name} label="name" fullWidth margin="dense"
            onChange={changeName} required />
        <TextField disabled value={user.team.name} label="team" fullWidth margin="dense" />
    </>
);

userForm.propTypes = {
    user: propTypes.object,
    changePassword: propTypes.func.isRequired,
    changeName: propTypes.func.isRequired,
};

export default userForm;