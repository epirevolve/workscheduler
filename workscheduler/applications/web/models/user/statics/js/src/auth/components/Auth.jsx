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
            <TextField autoFocus name={loginIdName} margin="normal" className="m-2"
                label="login id" type="text" required />
            <TextField name={passwordName} margin="normal" className="m-2"
                label="password" type="password" required />
        </div>
        <ButtonBase type="submit" className="m-2 btn-lg">
            Login
        </ButtonBase>
    </form>
)

export default auth;