import React from 'react'

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const $script = $('script[src*="auth"]');

const url = $script.data('url');

const auth = () => (
    <form action={url} method="post">
        <Input name="csrf_token" type="hidden" value={csrfToken} readOnly />
        <div className="mb-4">
            <TextField autoFocus name='loginId' margin="normal" className="m-2"
                label="login id" type="text" required />
            <TextField name='password' margin="normal" className="m-2"
                label="password" type="password" required />
        </div>
        <Button variant="contained" color="primary" type="submit" className="m-2 btn-lg" size="large">
            Login
        </Button>
    </form>
)

export default auth;