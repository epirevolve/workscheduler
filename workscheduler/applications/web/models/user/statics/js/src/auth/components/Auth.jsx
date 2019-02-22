import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const $script = $('script[src*="auth"]');

const url = $script.data('url');
const loginIdName = $script.data('loginIdName');
const passwordName = $script.data('passwordName');

const auth = () => (
    <form action={url} method="post">
        <Input name="csrf_token" type="hidden" value={csrfToken} readOnly />
        <div className="mb-4">
            <TextField autoFocus name={loginIdName} margin="dense"
                label="login id" type="text" fullWidth required />
            <TextField autoFocus name={passwordName} margin="dense"
                label="password" type="password" fullWidth required />
        </div>
        <ButtonBase type="submit">
            Login
        </ButtonBase>
    </form>
)

export default auth;